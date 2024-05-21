"use client";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

import "@/comps/PdfBox/PdfBoxStyle.css";
import { CiStar } from "react-icons/ci";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import retriver from "@/helper/retriver";
import { FaStar } from "react-icons/fa";
import axios from "axios";
export function PdfBox({ type }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function retriveData() {
      if (type == 2) {
        let savedDoc = JSON.parse(localStorage.getItem("saved")) || [];
        setData(savedDoc);
      } else {
        const res = await fetch('/api/retrive', {
          // method:"POST",
          cache:'no-cache',
          // body: null
        })
        // axios.post("/api/retrive", null).then(res => {
        //   const data = res.json();
        //   console.log(data);
        //   setData(data);
        // }).catch( err =>{
        //   const data = [];
        //   setData(data);
        // })
        // const res = await fetch("/api/retrive",  {next: { revalidate: 0 }, cache:'no-store' } );
        const data = await res.json();
        setData(data);
      }
    }
    retriveData();
  }, [type]);

  const router = useRouter();
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
  function handleRemove(item) {
    let savedDoc = JSON.parse(localStorage.getItem("saved")) || [];
    const newSaved = savedDoc.filter((elem) => elem.docUrl !== item.docUrl);
    setData(newSaved);
    localStorage.setItem("saved", JSON.stringify(newSaved));
    toast.success("Removed from saved!");
  }

  function checkSaved(url) {
    let savedDoc = JSON.parse(localStorage.getItem("saved")) || [];
    savedDoc.forEach((elem) => {
      if (elem.docUrl === url) {
        return true;
      }
    });
    return false;
  }

  return (
    <>
      {data.map((item) => (
        <div key={'pdf-box-' + item.docUrl} id="main-pdf-box">
          <div
            className="pdfbox-logo"
            key={"pdf-box-logo" + item.docUrl}
            onClick={() => {
              router.push(`/document/${item.docUrl}`);
            }}
          >
            <BsFillFileEarmarkPdfFill />
          </div>
          <h3
            className="pdfbox-title"
            key={"pdf-box-title" + item.title}
            onClick={() => {
              router.push(`/document/${item.docUrl}`);
            }}
          >
            {item.title}
          </h3>
          {type == 2 ? (
            <button
              onClick={() => handleRemove(item)}
              className="pdfbox-btn"
              style={{
                color: "rgb(255, 84, 84)",
                backgroundColor: "#ffcece",
              }}
            >
              <RxCross2 />
            </button>
          ) : checkSaved(item.docUrl) ? (
            <button
              className="pdfbox-btn"
              onClick={() => handleSave(item)}
              key={"pdf-box-button"}
            >
              <FaStar />
            </button>
          ) : (
            <button
              className="pdfbox-btn"
              onClick={() => handleSave(item)}
              key={"pdf-box-button"}
            >
              <CiStar />
            </button>
          )}
        </div>
      ))}
    </>
  );
}
