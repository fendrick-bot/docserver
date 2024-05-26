import "@/comps/AllDoc/AllDocStyle.css";
import { PdfBox } from "../PdfBox/PdfBox";

export function AllDoc() {
  return (
    <div id="main-content">
      <h2 style={{ width: "80%", textAlign: "left" }}>All Files</h2>
      <br />
      <div id="pdf-collection">
        <PdfBox type={1} />
      </div>
    </div>
  );
}
