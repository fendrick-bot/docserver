"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PdfComp({ filename }) {
  const [url, setUrl] = useState(
    `https://res.cloudinary.com/djtt5oivu/image/upload/${filename}.pdf`
  );
  const [numPages, setNumPages] = useState();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div
      style={{
        boxSizing:'border-box',
        // maxWidth: "400px",
        width:'400px',
        maxWidth:'80%',
        height: "fit-content",
        backgroundColor: "lightgray",
        padding: " 3px 5px",
        // border: "1px solid black",
        // borderRadius: "6px",
        overflowY: "auto",
        overflowX: "hidden",
        height: "70vh",
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
              <>
                <Page
                  key={page}
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={370}
                />
                <br />
              </>
            );
          })}
      </Document>
    </div>
  );
}
export default PdfComp;
