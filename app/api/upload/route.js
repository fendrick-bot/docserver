import { connect } from "@/helper/dbconfig/dbconfig";
import Doc from "@/helper/models/docModel";
import { NextResponse } from "next/server";

connect();
export async function POST(request) {
  console.log("running api");

  try {
    const reqBody = await request.json();
    const { title, docUrl, owner, size } = reqBody;

    const newDoc = new Doc({
      title,
      docUrl,
      owner,
      size,
    });

    const uploadRes = await newDoc.save();
    return NextResponse.json({
      message: "upload successful",
      success: true,
      uploadRes,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

