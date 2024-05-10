"use client";
import { useState } from "react";

import "@/comps/PdfBox/PdfBoxStyle.css";
import { CiStar } from "react-icons/ci";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function PdfBox({ data }) {
  const router = useRouter()
  const [title, setTitle] = useState("");
  function handleSave(item) {
    let savedDoc = JSON.parse(localStorage.getItem("saved")) || [];
    const newDoc = {
      title: item.title,
      owner: item.owner,
      size: item.size,
      docUrl: item.docUrl,
    };
    let found = false;

    savedDoc.forEach((elem) => {
      if (elem.docUrl === newDoc.docUrl) found = true;
    });
    if (!found) {
      savedDoc.push(newDoc);
      toast.success("File Saved!");
    } else toast.error("File already Added!");
    localStorage.setItem("saved", JSON.stringify(savedDoc));
  }

  return (
    <div
    key={"pdfbox"}
      id="main-pdf-box"
      onClick={() => {
        router.push(`/document/${data.docUrl}`);
      }}
    >
      <div className="pdfbox-logo" key={"pdf-box-logo"}>
        <BsFillFileEarmarkPdfFill />
      </div>
      <h3 className="pdfbox-title" key={"pdf-box-title"}>{data.title}</h3>
      <button className="pdfbox-btn" onClick={() => handleSave(data)} key={"pdf-box-button"}>
        <CiStar />
      </button>
    </div>
  );
}
