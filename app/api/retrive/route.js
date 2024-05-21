import { connect } from "@/helper/dbconfig/dbconfig";
import Doc from "@/helper/models/docModel";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connect();
  console.log("running api");
  try {
    let data = await Doc.find({});
    // let res = NextResponse( data, headers:{'Cache-Control': 'public, s-maxage=1',
    // 'CDN-Cache-Control': 'public, s-maxage=60',
    // 'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',})
    // return res

    return NextResponse.json({ message: "retrive success", success: true, data });
    // return NextResponse.setHeader("Cache-Control", "public, s-maxage=0").json(
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
