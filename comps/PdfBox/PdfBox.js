
'use client'
import { useState } from "react";
import "@/comps/PdfBox/PdfBoxStyle.css";
import { CiStar } from "react-icons/ci";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

export function PdfBox({data}) {
    const [title, setTitle] = useState("");

  return (
    <div id="main-pdf-box">
      <div className="pdfbox-logo">
        <BsFillFileEarmarkPdfFill />
      </div>
      <h3 className="pdfbox-title">{data.title}</h3>
      <button className="pdfbox-btn"><CiStar /></button>
    </div>
  );
}
