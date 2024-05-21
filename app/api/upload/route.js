import { connect } from "@/helper/dbconfig/dbconfig";
import Doc from "@/helper/models/docModel";
import { NextResponse } from "next/server";

connect();
export async function GET() {
  await connect();
  console.log("running api");
  try {
    let data = await Doc.find({});
    // let res = NextResponse( data, headers:{'Cache-Control': 'public, s-maxage=1',
    // 'CDN-Cache-Control': 'public, s-maxage=60',
    // 'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',})
    // return res

    return NextResponse.json({
      message: "retrive success",
      success: true,
      data,
    });
    // return NextResponse.setHeader("Cache-Control", "public, s-maxage=0").json(
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
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

