// import { pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

import dynamic from "next/dynamic";
const PdfComp = dynamic(()=> import("@/app/document/[document]/pdfComp"),{
  ssr:false
})

// const PDFViewer = dynamic(() => import("../components/pdf-viewer"), {
//   ssr: false
// });
export default function Profile({ params }) {
  return (
    <main style={{display:"flex", flexDirection:"column" , alignItems:"center", justifyContent:"center"}}>
      <br />
      <br />
      <br />
      <h1>Bla bla bla</h1>
      <PdfComp filename={params.document} />

      {/* <embed src= {`https://res.cloudinary.com/djtt5oivu/image/upload/${params.document}.pdf`} type="application/pdf"  width= "450px" height= "650px" title="New Pdf" style={{background:"white"}}/> */}
    </main>
  );
}
