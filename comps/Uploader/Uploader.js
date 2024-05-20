"use client";
import "@/comps/Uploader/UploaderStyle.css";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { useRef, useState } from "react";
import axios, {CancelToken, isCancel } from "axios";
import { uploadConfig } from "@/helper/CloudUpload";
import { IoCloudUpload } from "react-icons/io5";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import succesImg from "@/public/confetti-success.png";
import Image from "next/image";

export function Uploader() {
  const [file, setFile] = useState(null);
  const [showUpload, hideUpload] = useState(true);
  const [showSuccess, setSuccess] = useState(false);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [docDetail, setDetail] = useState({ title: "", owner: "" });
  const cancelUpload = useRef(null);
  const [cancel, setCancel] = useState(false);

  let uploadDetail = {
    title: "Demo file",
    docUrl: " momomo ",
    owner: "Fendrick",
    size: "0kb",
  };

  async function handleFileUpload(e) {
    setCancel(false);
    if (!docDetail.title || !docDetail.owner) {
      toast.error("Please fill the required details!");
      return;
    }
    if (!file) {
      toast.error("No file selected!");
      return;
    }

    if (file.type != "application/pdf")
      return toast.error("The selected file is not of the type pdf!");

    if (file.size > 10485760)
      return toast.error("The selected file is too big!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cloud_name", uploadConfig.cloudName);
    formData.append("upload_preset", uploadConfig.upload_preset);

    const res = await axios
      .post(uploadConfig.url, formData, {
        cancelToken: await new CancelToken(
          (cancel) => (cancelUpload.current = cancel)
        ),
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return {
              ...prevState,
              pc: Math.round(progressEvent.progress * 90, 100),
            };
          });
        },
      })
      .catch((err) => {
        if (isCancel(err)) {
          toast.error("upload cancelled!");
        }
      });


    if (res) {
      uploadDetail.docUrl = res.data.public_id;
      uploadDetail.title = docDetail.title;
      uploadDetail.owner = docDetail.owner;

      let fileSize = file.size.toString();
      fileSize.length < 7
        ? (uploadDetail.size = `${Math.round(+fileSize / 1024).toFixed(2)} KB`)
        : (uploadDetail.size = `${(Math.round(+fileSize / 1024) / 1000).toFixed(
            2
          )} MB`);

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
      setSuccess(true);
    }
  }

  function abortUpload() {
    if (cancelUpload.current) {
      setCancel(true);
      cancelUpload.current("upload Cancelled");
    }
    setProgress((prevState) => {
      return {
        ...prevState,
        pc: 0,
      };
    });
    hideUpload(true);
    setFile(null);
  }

  return showSuccess ? (
    <div id="upload-success">
      <Image src={succesImg} objectFit="contain" alt="success upload"  priority/>
      <br />
      <h2>upload Success!</h2>
      <p>
        The file has been successfully uploaded. now anyone can access your file
        from the document page or you can share the file to anyone...
      </p>
      <button
        id="upload-more"
        onClick={() => {
          window.location.reload();
        }}
      >
        Upload Again!
      </button>
    </div>
  ) : (
    <div id="uploadDiv">
      <br />
      <br />
      <div id="uploadArea" className="upload-area">
        <div className="upload-area__header">
          <h1 className="upload-area__title">Upload your file</h1>
          <p className="upload-area__paragraph">
            File should be an document -
            <strong className="upload-area__tooltip">
              Like
              <span className="upload-area__tooltip-data">.pdf</span>
            </strong>
          </p>
        </div>
        <div>
          <div className="upload_input_div">
            <label htmlFor="title">Title </label>
            <input
              className="upload_input"
              type="text"
              value={docDetail.title}
              onChange={(e) =>
                setDetail({ ...docDetail, title: e.target.value })
              }
            />
          </div>
          <div className="upload_input_div">
            <label htmlFor="title">Uploader Name </label>
            <input
              className="upload_input"
              type="text"
              value={docDetail.owner}
              onChange={(e) =>
                setDetail({ ...docDetail, owner: e.target.value })
              }
            />
          </div>
          {showUpload ? (
            <div>
              <div
                id="dropZoon"
                className="upload-area__drop-zoon drop-zoon"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e)}
                onClick={(e) => {
                  fileInput.click();
                }}
              >
                <span className="drop-zoon__icon">
                  <BsFillFileEarmarkPdfFill />
                </span>
                <p className="drop-zoon__paragraph">
                  Drop your file here or Click to browse
                </p>
                <span id="loadingText" className="drop-zoon__loading-text">
                  Please Wait
                </span>
                <img
                  src=""
                  alt="Preview Image"
                  id="previewImage"
                  className="drop-zoon__preview-image"
                  draggable="false"
                ></img>
                <input
                  type="file"
                  id="fileInput"
                  className="drop-zoon__file-input"
                  accept=".pdf"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    hideUpload(false);
                    document.getElementById("upload_btn").disabled = false;
                  }}
                ></input>
              </div>
              <br />
            </div>
          ) : (
            <div>
              <div id="file-box">
                <span className="drop-zoon__icon" style={{ fontSize: "40px" }}>
                  <BsFillFileEarmarkPdfFill />
                </span>
                <div id="file-details">
                  <span>{file.name}</span>
                  <progress
                    id="progress"
                    max={100}
                    value={progress.pc}
                  ></progress>
                </div>
                {progress.pc == 90 ? null : (
                  <button onClick={abortUpload} id="file-upload-cancel">
                    <RxCross2 />
                  </button>
                )}
                <br />
                <br />
              </div>
            </div>
          )}
          <button onClick={(e) => handleFileUpload(e)} id="upload_btn">
            {" "}
            <IoCloudUpload />
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
}
