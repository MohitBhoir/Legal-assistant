from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
import pandas as pd
import torch
from fastapi.middleware.cors import CORSMiddleware

# File path to the IPC dataset
file_path = 'ipc_sections.csv'
try:
    ipc_data = pd.read_csv(file_path)
except FileNotFoundError:
    raise RuntimeError(f"File not found: {file_path}")

# Drop rows where 'Offense' is NaN and reset index
ipc_data = ipc_data.dropna(subset=['Offense']).reset_index(drop=True)

# Load pre-trained SBERT model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Pre-compute embeddings for all offenses
try:
    ipc_data['Embedding'] = list(
        model.encode(ipc_data['Offense'].tolist(), convert_to_tensor=True)
    )
except Exception as e:
    raise RuntimeError(f"Error during embedding computation: {str(e)}")

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for offense similarity request
class OffenseRequest(BaseModel):
    input_offense: str
    top_n: int = 20  # Default to top 20 results

@app.post("/api/find-similar-offenses")
def find_similar_offenses(request: OffenseRequest):
    try:
        # Vectorize the input offense using the SBERT model
        input_embedding = model.encode(request.input_offense, convert_to_tensor=True)

        # Retrieve all precomputed embeddings
        all_embeddings = torch.stack(ipc_data['Embedding'].tolist())

        # Compute cosine similarity
        similarities = util.cos_sim(input_embedding, all_embeddings)[0]

        # Get the indices of the top N most similar offenses
        top_indices = similarities.argsort(descending=True)[:request.top_n].cpu().numpy().astype(int)

        # Retrieve the top N most similar offenses and corresponding details
        results = []
        for idx in top_indices:
            most_similar_offense = ipc_data.iloc[idx]
            results.append({
                'Offense': most_similar_offense['Offense'],
                'Punishment': most_similar_offense['Punishment'],
                'Section': most_similar_offense['Section'],
                'Similarity': similarities[idx].item()  # Include similarity score for reference
            })

        return {"results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Pydantic model for IPC details request
class IPCDetailsRequest(BaseModel):
    match_string: str

@app.post("/api/ipc_details")
def ipc_details(request: IPCDetailsRequest):
    try:
        # Filter rows where 'Section' matches the input string
        matching_rows = ipc_data[ipc_data['Section'].str.contains(request.match_string, case=False, na=False)]

        if matching_rows.empty:
            raise HTTPException(status_code=404, detail="No matching IPC sections found.")

        # Convert matching rows to a dictionary
        results = matching_rows.to_dict(orient="records")
        return {"results": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def root():
    return {"message": "Welcome to the IPC Similarity API. Use /find-similar-offenses or /ipc_details for functionality."}
