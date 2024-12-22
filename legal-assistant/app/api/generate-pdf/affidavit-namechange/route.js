import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the incoming JSON request body
    const body = await req.json();

    // Load the Word document template for the affidavit
    const filePath = path.join(process.cwd(), "public", "templates", "Affidavit_Change_Name_Template.docx");

    // Read the file as Buffer
    const content = fs.readFileSync(filePath);

    const zip = new PizZip(content);

    // Initialize Docxtemplater
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      lineBreaks: true,
      delimiters: {
        start: '[',
        end: ']'
      }
    });

    // Prepare data with all placeholders
    const templateData = {
      newName: body.newName || 'Not Provided',
      parentName: body.parentName || 'Not Provided',
      oldName: body.oldName || 'Not Provided',
      profession: body.profession || 'Not Provided',
      permanentAddress: body.permanentAddress || 'Not Provided',
      currentAddress: body.currentAddress || 'Not Provided',
      passportNumber: body.passportNumber || 'Not Provided',
      issuingPlace: body.issuingPlace || 'Not Provided',
      issuingDate: body.issuingDate || 'Not Provided',
      witness1Name: body.witnesses?.[0]?.name || 'Not Provided',
      witness1Address: body.witnesses?.[0]?.address || 'Not Provided',
      witness2Name: body.witnesses?.[1]?.name || 'Not Provided',
      witness2Address: body.witnesses?.[1]?.address || 'Not Provided',
      day: body.day || 'Not Provided',
      month: body.month || 'Not Provided',
      year: body.year || 'Not Provided',
    };

    try {
      // Set the template data
      doc.setData(templateData);

      // Render the document
      doc.render();
    } catch (error) {
      console.error("Rendering Error Details:", error);
      return NextResponse.json(
        { 
          error: "Error rendering affidavit template", 
          details: error instanceof Error ? error.message : String(error) 
        }, 
        { status: 500 }
      );
    }

    // Generate the document
    const buf = doc.getZip().generate({ type: "nodebuffer" });

    // Send the modified document as a response
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=Affidavit_Change_of_Name.docx"
      }
    });
  } catch (error) {
    console.error("Unexpected error in affidavit document generation:", error);
    return NextResponse.json(
      { 
        error: "Unable to generate affidavit document", 
        details: error instanceof Error ? error.message : String(error) 
      }, 
      { status: 500 }
    );
  }
}
