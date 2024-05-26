"use client";
import { LuDownloadCloud } from "react-icons/lu";
import fileDownload from "js-file-download";
import axios from "axios";
import '@/comps/DownloadBtn/DownloadBtnStyle.css'

export function DownloadBtn({ filename }) {

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob"
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
      <button onClick={()=> handleDownload(`https://res.cloudinary.com/djtt5oivu/image/upload/${filename}.pdf`, `Doc-${filename}.pdf`)} id="upload_btn">
        {" "}
        <LuDownloadCloud />
        Download File
      </button>
  );
}
