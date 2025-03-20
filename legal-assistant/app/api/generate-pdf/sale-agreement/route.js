import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const filePath = path.join(process.cwd(), "public", "templates", "Sale_Agreement_Template.docx");
    const content = fs.readFileSync(filePath);

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      lineBreaks: true,
      delimiters: {
        start: "[",
        end: "]",
      },
    });

    const templateData = {
      executionDate: body.executionDate || "Not Provided",
      executionMonth: body.executionMonth || "Not Provided",
      executionYear: body.executionYear || "Not Provided",
      vendorName: body.vendorName || "Not Provided",
      vendorFatherName: body.vendorFatherName || "Not Provided",
      vendorAddress: body.vendorAddress || "Not Provided",
      purchaserName: body.purchaserName || "Not Provided",
      purchaserFatherName: body.purchaserFatherName || "Not Provided",
      purchaserAddress: body.purchaserAddress || "Not Provided",
      totalPrice: body.totalPrice || "Not Provided",
      totalPriceWords: body.totalPriceWords || "Not Provided",
      earnestMoney: body.earnestMoney || "Not Provided",
      earnestMoneyWords: body.earnestMoneyWords || "Not Provided",
      performanceMonths: body.performanceMonths || "Not Provided",
      balancePrice: body.balancePrice || "Not Provided",
      balancePriceWords: body.balancePriceWords || "Not Provided",
      titleDeedsDays: body.titleDeedsDays || "Not Provided",
      titleApprovalDays: body.titleApprovalDays || "Not Provided",
      refundDays: body.refundDays || "Not Provided",
      interestRate: body.interestRate || "Not Provided",
      houseNumber: body.houseNumber || "Not Provided",
      propertyLocation: body.propertyLocation || "Not Provided",
      northBoundary: body.northBoundary || "Not Provided",
      southBoundary: body.southBoundary || "Not Provided",
      eastBoundary: body.eastBoundary || "Not Provided",
      westBoundary: body.westBoundary || "Not Provided",
      witness1Name: body.witness1Name || "Not Provided",
      witness1Address: body.witness1Address || "Not Provided",
      witness2Name: body.witness2Name || "Not Provided",
      witness2Address: body.witness2Address || "Not Provided",
    };

    doc.setData(templateData);
    doc.render();

    const buf = doc.getZip().generate({ type: "nodebuffer" });

    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=Sale_Agreement.docx",
      },
    });
  } catch (error) {
    console.error("Error generating sale agreement:", error);
    return NextResponse.json({ error: "Failed to generate document." }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    // Define the file path to the DOCX template
    const filePath = path.join(process.cwd(), "public", "templates", "Sale_Agreement_Template.docx");

    // Read the file
    const content = fs.readFileSync(filePath);

    // Send the file as a response
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=Sale_Agreement_Template.docx"
      }
    });
  } catch (error) {
    console.error("Error sending DOCX template:", error);
    return NextResponse.json(
      { error: "Unable to send the DOCX template", details: error.message },
      { status: 500 }
    );
  }
}