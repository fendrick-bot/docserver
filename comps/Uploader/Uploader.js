"use client";
import "@/comps/Uploader/UploaderStyle.css";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";

export function Uploader() {
  // const fileInput = document.querySelector("#fileInput");
  // const dropZoon = document.querySelector("#dropZoon");
  // const loadingText = document.querySelector("#loadingText");
  // const previewImage = document.querySelector("#previewImage");
  // const uploadArea = document.querySelector("#uploadArea");
  // const uploadedFile = document.querySelector("#uploadedFile");
  // const uploadedFileInfo = document.querySelector("#uploadedFileInfo");
  // const uploadedFileName = document.querySelector(".uploaded-file__name");
  // const uploadedFileCounter = document.querySelector(".uploaded-file__counter");
  // const uploadedFileIconText = document.querySelector(
  //   ".uploaded-file__icon-text"
  // );

  // const imagesTypes = ["jpeg", "png", "svg", "gif"];
  // let fileReader;

  // useEffect(() => {
  //   fileReader = new FileReader();
  //   // ...
  // }, []);

  // function uploadFile(file) {
  //   const fileType = file.type;
  //   const fileSize = file.size;

  //   if (fileValidate(fileType, fileSize)) {
  //     dropZoon.classList.add("drop-zoom--Uploaded");
  //     loadingText.style.display = "block";
  //     previewImage.style.display = "none";
  //     uploadedFile.classList.remove("uploaded-file--open");
  //     uploadedFileInfo.classList.remove("uploaded-file__info--active");

  //     fileReader.addEventListener("load", function () {
  //       setTimeout(function () {
  //         uploadArea.classList.add("upload-area--open");
  //         loadingText.style.display = "none";
  //         previewImage.style.display = "block";
  //         fileDetails.classList.add("file-details--open");
  //         uploadedFile.classList.add("uploaded-file--open");
  //         uploadedFileInfo.classList.add("uploaded-file__info--active");
  //       }, 500);

  //       previewImage.setAttribute("src", fileReader.result);
  //       uploadedFileName.innerHTML = file.name;
  //       progressMove();
  //     });
  //     fileReader.readAsDataURL(file);
  //   } else this;
  // }

  // function progressMove() {
  //   let counter = 0;
  //   setTimeout(() => {
  //     let counterIncrease = setInterval(() => {
  //       if (counter === 100) {
  //         clearInterval(counterIncrease);
  //       } else {
  //         counter = counter + 10;
  //         uploadedFileCounter.innerHTML = `${counter}%`;
  //       }
  //     }, 100);
  //   }, 600);
  // }

  // function fileValidate(fileType, fileSize) {
  //   let isImage = imagesTypes.filter(
  //     (type) => fileType.indexOf(`image/${type}`) !== -1
  //   );

  //   // if( isImage[0] == 'jpeg'){
  //   //   uploadedFileIconText.innerHTML = 'jpg';
  //   // }
  //   // else uploadedFileIconText.innerHTML = isImage[0];

  //   if (isImage.length !== 0) {
  //     if (fileSize <= 2000000) {
  //       return true;
  //     } else return alert("Please Your File Should be 2 Megabytes or Less");
  //   } else {
  //     return alert("Please make sure to upload An Image File Type");
  //   }
  // }

  // function handleDrop(e) {
  //   e.preventDefault();
  //   const file = e.dataTransfer.files[0];
  //   uploadFile(file);
  // }
  // function handleInputChange(e) {
  //   const file = e.target.files[0];
  //   uploadFile(file);
  // }

  const [file, setFile] = useState(null);
  const [filepath, setPath] = useState(null);
  const [showUpload, hideUpload] = useState(true);
  const [progress, setProgress] = useState({ started: false, pc: 0 });

  const [data, SetData] = useState({
    Title: "Demo File",
    path : null,
    owner: "Fendrick",
  });

  async function handleFileUpload() {
    if (!file) {
      console.log("no file selected");
      return;
    }
    const fd = new FormData();
    fd.set('file', file);
    SetData((prevData) =>{return{ ...prevData , path: filepath }; })
    await axios
      .post("/api/upload", fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: progressEvent.progress * 100 };
          });
          console.log(progressEvent.progress * 100);
        },
        headers: {
          title: "This is a demo title of the doc",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  function abortUpload() {
    hideUpload(true);
    setFile(null);
  }

  return (
    <div id="uploadDiv">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div id="uploadArea" class="upload-area">
        <div class="upload-area__header">
          <h1 class="upload-area__title">Upload your file</h1>
          <p class="upload-area__paragraph">
            File should be an image -
            <strong class="upload-area__tooltip">
              Like
              <span class="upload-area__tooltip-data">.pdf .txt .img</span>
            </strong>
          </p>
        </div>
        <br />
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
                accept="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  // const path =  (window.URL || window.webkitURL).createObjectURL(file);
                  // setPath(path);
                  console.log(e.target.files[0]);
                  hideUpload(false);
                }}
              ></input>
            </div>
            <br />
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
            <button onClick={handleFileUpload}>upload</button>{" "}
          </div>
        )}
      </div>
    </div>

    // </div>
  );
}
