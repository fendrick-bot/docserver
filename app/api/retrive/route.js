import { connect } from "@/helper/dbconfig/dbconfig";
import Doc from "@/helper/models/docModel";
import { NextResponse } from "next/server";

connect();
export async function GET() {
    console.log("running api");
    
    try {
        let data = await Doc.find({});
        console.log(data);
        return NextResponse.json(data);
        
        // return NextResponse.json({
        // message: "retrive successful",
        // success: true,
        // val
        // });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
