import { connect } from "@/helper/dbconfig/dbconfig";
import Doc from "@/helper/models/docModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET() {
  await connect();
  console.log("running api");
  try {
    let data = await Doc.find({});
    return NextResponse.json({
      message: "retrive success",
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
