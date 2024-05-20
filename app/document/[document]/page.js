import dynamic from "next/dynamic";
const PdfComp = dynamic(()=> import("@/app/document/[document]/pdfComp"),{
  ssr:false
})
export default function Profile({ params }) {
  return (
    <main style={{display:"flex", flexDirection:"column" , alignItems:"center", justifyContent:"center", paddingTop:'100px'}}>
      <PdfComp filename={params.document} />
    </main>
  );
}
