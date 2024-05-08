"use client";
import "@/comps/Uploader/UploaderStyle.css";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { uploadConfig } from "@/helper/CloudUpload";
import Link from "next/link";
// import { uploadFile } from "@/helper/CloudUpload";

export function Uploader() {
  const [file, setFile] = useState(null);
  const [showUpload, hideUpload] = useState(true);
  const [showSuccess, setSuccess] = useState(false);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [docDetail, setDetail] = useState({ title: null , owner : null });

  let uploadDetail = {
    title: "Demo file",
    docUrl: " momomo ",
    owner: "Fendrick",
    size: "0kb"
  };

  async function handleFileUpload(e) {
    if(!docDetail.title || !docDetail.owner){
      alert("Please fill the required details!")
      return;
    }
    if (!file) {
      alert("No file selected!");
      return;
    }
    console.log(file.type);
    if(file.type != "application/pdf") return alert("The selected file is not of the type pdf!");


    const formData = new FormData();
    formData.append("file", file);
    formData.append("cloud_name", uploadConfig.cloudName);
    formData.append("upload_preset", uploadConfig.upload_preset);

    const res = await axios
      .post(uploadConfig.url, formData, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return {
              ...prevState,
              pc: Math.round(progressEvent.progress * 90, 100),
            };
          });
        },
      })
      .catch((err) => console.error(err));

      console.log(res);

    uploadDetail.docUrl = res.data.public_id;
    uploadDetail.title = docDetail.title;
    uploadDetail.owner = docDetail.owner;

    let fileSize = file.size.toString();
    fileSize.length < 7 ? uploadDetail.size = `${Math.round(+fileSize/1024).toFixed(2)} KB` : uploadDetail.size =  `${(Math.round(+fileSize/1024)/1000).toFixed(2)} MB`;  

    console.log(uploadDetail);

    await axios
      .post("/api/upload", uploadDetail, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return {
              ...prevState,
              pc: +Math.round(90 + progressEvent.progress * 10, 100),
            };
          });
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

      setSuccess(true);
  }

  function abortUpload() {
    hideUpload(true);
    setFile(null);
  }

  return (
    showSuccess? <div style={{paddingTop:"200px"}}>
      upload Successfull 🎉
      <button onClick={()=>{window.location.reload()}}>upload more</button>

      
      </div> : 
    <div id="uploadDiv">
      <br />
      <br />
      <div id="uploadArea" class="upload-area">
        <div class="upload-area__header">
          <h1 class="upload-area__title">Upload your file</h1>
          <p class="upload-area__paragraph">
            File should be an image -
            <strong class="upload-area__tooltip">
              Like
              <span class="upload-area__tooltip-data">.pdf</span>
            </strong>
          </p>
        </div>
        <div>
          <label htmlFor="title">Title </label>
          <br />
          <input type="text" value={docDetail.title} onChange={(e) => setDetail({...docDetail, title: e.target.value })} />
          <label htmlFor="title">Uploader Name </label>
          <br />
          <input type="text" value={docDetail.owner} onChange={(e) => setDetail({...docDetail, owner: e.target.value })}/>
          <br />
          {showUpload ? (
            <div>
              <div
                id="dropZoon"
                class="upload-area__drop-zoon drop-zoon"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e)}
                onClick={(e) => {
                  fileInput.click();
                }}
              >
                <span class="drop-zoon__icon">
                  <BsFillFileEarmarkPdfFill />
                </span>
                <p class="drop-zoon__paragraph">
                  Drop your file here or Click to browse
                </p>
                <span id="loadingText" class="drop-zoon__loading-text">
                  Please Wait
                </span>
                <img
                  src=""
                  alt="Preview Image"
                  id="previewImage"
                  class="drop-zoon__preview-image"
                  draggable="false"
                ></img>
                <input
                  type="file"
                  id="fileInput"
                  class="drop-zoon__file-input"
                  accept=".pdf"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    // const path =  (window.URL || window.webkitURL).createObjectURL(file);
                    // setPath(path);
                    console.log(e.target.files[0]);
                    hideUpload(false);
                    document.getElementById("upload_btn").disabled = false;
                  }}
                ></input>
              </div>
              <br />
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                <span class="" style={{ fontSize: "30px" }}>
                  <BsFillFileEarmarkPdfFill />
                </span>
                <div>
                  <span>{file.name}</span>
                  <br />
                  <progress
                    max={100}
                    value={progress.pc}
                    style={{ height: "6px", borderRadius: "60px" }}
                  ></progress>
                  <span>{progress.pc} %</span>
                </div>
                {progress.pc == 100 ? null : (
                  <button onClick={abortUpload}>cancel</button>
                )}
                <br />
                <br />
              </div>
            </div>
          )}
          <button onClick={(e)=> handleFileUpload(e)} id="upload_btn"> upload</button>
        </div>
      </div>
    </div>


    // </div>
  );
}
