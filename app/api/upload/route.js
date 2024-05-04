import { connect } from "@/helper/dbconfig/dbconfig";
import Doc from "@/helper/models/docModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
// import { join } from "path";
import multer from "multer";
import nc from "next-connect";
import { uploadFile } from "@/helper/CloudUpload";
import { unlink } from "fs";
import fs from "fs";


export async function POST(request) {
  connect();
  console.log("running api");
  let data = await request.formData();
  console.log(data);
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `./public/temp/${file.name}`;
  await writeFile(path, buffer);

  await uploadFile(path);
  fs.unlink(path, function (err) {
    if (err) console.log("unable to delete file " + err);
    else console.log("file Deleted success!");
  });

  const response = NextResponse.json({
    message: "file uploaded",
    success: true,
  });
  return response;
}
