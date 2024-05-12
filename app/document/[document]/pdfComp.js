'use client'
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import assign from "@/public/assignment.pdf


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


function PdfComp({filename}) {
    const [url, setUrl] = useState(`https://res.cloudinary.com/djtt5oivu/image/upload/${filename}.pdf`);
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
    <div style={{width:'400px' , height:'fit-content' , backgroundColor:'gray' , border:"1px solid black"}}>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess} style={{width:"400px"}}>
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} style={{width:"400px"}} width={390} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PdfComp;