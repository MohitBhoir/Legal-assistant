import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
import pandas as pd
import torch
import logging
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# === GEMINI API SETUP === #
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

# === IPC DATASET SETUP === #
file_path = "ipc_sections.csv"
try:
    ipc_data = pd.read_csv(file_path)
except FileNotFoundError:
    raise RuntimeError(f"File not found: {file_path}")

ipc_data = ipc_data.dropna(subset=["Offense"]).reset_index(drop=True)

# Load pre-trained SBERT model for offense similarity
sbert_model = SentenceTransformer("all-MiniLM-L6-v2")

# Pre-compute embeddings for all offenses
try:
    ipc_data["Embedding"] = list(
        sbert_model.encode(ipc_data["Offense"].tolist(), convert_to_tensor=True)
    )
except Exception as e:
    raise RuntimeError(f"Error during embedding computation: {str(e)}")

# Initialize FastAPI app
app = FastAPI(
    title="Legal API",
    description="API for legal use cases including lawyer type selection and IPC similarity matching.",
    version="1.0.0",
)

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Pydantic Models === #
class LawyerTypeRequest(BaseModel):
    query: str

class OffenseRequest(BaseModel):
    input_offense: str
    top_n: int = 20  # Default to top 20 results

class IPCDetailsRequest(BaseModel):
    match_string: str

# === Lawyer Type Selection Function === #
def choose_lawyer_type(query: str) -> str:
    try:
        logger.info("Starting lawyer type selection for query")
        prompt = (
            f"Given the query: {query} Choose type of lawyer required from "
            f"'Corporate, Criminal, Family, Civil, Tax'. Answer in 1 word. "
            f"If input is nonsensical/rubbish/random letters then give message 'Please try again'."
        )
        response = gemini_model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.3,
                "max_output_tokens": 10,
            },
        )
        if not response or not response.text.strip():
            raise ValueError("Empty response from the model")

        logger.info("Successfully received response from Gemini")
        return response.text.strip()
    except Exception as e:
        logger.error(f"Error in choose_lawyer_type: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error in choosing type: {str(e)}")

# === Lawyer Type Selection Endpoint === #
@app.post("/api/lawyer-type")
async def get_lawyer_type(request: LawyerTypeRequest):
    try:
        logger.info("Received request")
        query = request.query
        lawyer_type = choose_lawyer_type(query)
        logger.info(f"Returning lawyer type: {lawyer_type}")
        return {"lawyer_type": lawyer_type, "error": None}
    except HTTPException as e:
        logger.error(f"HTTP Exception: {str(e.detail)}")
        return {"lawyer_type": "Error", "error": str(e.detail)}
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return {"lawyer_type": "Error", "error": "An unexpected error occurred"}

# === Find Similar Offenses Endpoint === #
@app.post("/api/find-similar-offenses")
def find_similar_offenses(request: OffenseRequest):
    try:
        input_embedding = sbert_model.encode(request.input_offense, convert_to_tensor=True)
        all_embeddings = torch.stack(ipc_data["Embedding"].tolist())
        similarities = util.cos_sim(input_embedding, all_embeddings)[0]
        top_indices = similarities.argsort(descending=True)[: request.top_n].cpu().numpy().astype(int)

        results = []
        for idx in top_indices:
            most_similar_offense = ipc_data.iloc[idx]
            results.append({
                "Offense": most_similar_offense["Offense"],
                "Punishment": most_similar_offense["Punishment"],
                "Section": most_similar_offense["Section"],
                "Similarity": similarities[idx].item(),
            })

        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# === IPC Details Endpoint === #
@app.post("/api/ipc_details")
def ipc_details(request: IPCDetailsRequest):
    try:
        matching_rows = ipc_data[
            ipc_data["Section"].str.contains(request.match_string, case=False, na=False)
        ]
        if matching_rows.empty:
            raise HTTPException(status_code=404, detail="No matching IPC sections found.")
        results = matching_rows.to_dict(orient="records")
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# === Root Endpoint === #
@app.get("/")
def root():
    return {
        "message": "Welcome to the Legal API. Use /api/lawyer-type, /api/find-similar-offenses, or /api/ipc_details for functionality."
    }

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting server...")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
