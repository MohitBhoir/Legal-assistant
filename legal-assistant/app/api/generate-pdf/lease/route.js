import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the incoming JSON request body
    const body = await req.json();

    // Load the Word document template
    const filePath = path.join(process.cwd(), "public", "templates", "Commercial Lease Agreement template.docx");
    
    // Read file as Buffer instead of binary
    const content = fs.readFileSync(filePath);

    const zip = new PizZip(content);
    
    // Important: Set debugger to see detailed errors
    const doc = new Docxtemplater(zip, { 
      paragraphLoop: true, 
      lineBreaks: true,
      delimiters: {
        start: '[',
        end: ']'
      }
    });

    // Prepare data with all potential placeholders
    const templateData = {
      // Lessor Details
      lessorName: body.lessorName || 'Not Provided',
      lessorFatherName: body.lessorFatherName || 'Not Provided',
      lessorAge: body.lessorAge || 'none',
      lessorAddress: body.lessorAddress || 'Sample Lessor Address',

      // Lessee Details
      lesseeName: body.lesseeName || 'Not Provided',
      lesseeFatherName: body.lesseeFatherName || 'Not Provided',
      lesseeAge: body.lesseeAge || 'none',
      lesseeAddress: body.lesseeAddress || 'Sample Lessee Address',

      // Property Details
      propertyArea: body.propertyArea || 'none',
      propertyAddress: body.propertyAddress || 'Sample Property Address',

      // Lease Terms
      leaseDate: body.leaseDate || new Date().toLocaleDateString(),
      rentAmount: body.rentAmount || 'none',
      securityDeposit: body.securityDeposit || 'none',
      paymentDueDate: body.paymentDueDate || 'none',
      
      // Additional Details
      lateFee: body.lateFee || 'none',
      governingLaws: body.governingLaws || 'Laws of India',
      jurisdiction: body.jurisdiction || 'Appropriate Court',
      terminationNoticePeriod: body.terminationNoticePeriod || '30',
      totalRentLateAmount: body.lateFee + body.rentAmount || 'none'
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
          error: "Error rendering template", 
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
        "Content-Disposition": "attachment; filename=Commercial_Lease_Agreement.docx"
      }
    });

  } catch (error) {
    console.error("Unexpected error in lease document generation:", error);
    return NextResponse.json(
      { 
        error: "Unable to generate lease document", 
        details: error instanceof Error ? error.message : String(error) 
      }, 
      { status: 500 }
    );
  }
}