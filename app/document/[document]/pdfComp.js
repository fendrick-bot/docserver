"use client";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import assign from "@/public/assignment.pdf

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PdfComp({ filename }) {
  const [url, setUrl] = useState(
    `https://res.cloudinary.com/djtt5oivu/image/upload/${filename}.pdf`
  );
  console.log(url);

  // useEffect( async()=>{
  //     await setUrl(`https://res.cloudinary.com/djtt5oivu/image/upload/${filename}.pdf`);
  // }, [])
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      style={{
        width: "400px",
        height: "fit-content",
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "6px",
        overflowY: "scroll",
        overflowX: "hidden",
        height: "75vh",
      }}
    >
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        style={{ overflow: "scroll" }}
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
              key={page}
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={390}
              />
            );
          })}
      </Document>
    </div>
  );
}

export default PdfComp;
