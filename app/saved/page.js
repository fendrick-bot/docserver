import "@/app/saved/savedStyle.css";
import { PdfBox } from "@/comps/PdfBox/PdfBox";

export default function Saved() {
  return (
    <div id="saved-main-div">
      <h2>Saved Documents</h2>
      <br />
      <PdfBox type={2} key={"pdf-box-main"} />
    </div>
  );
}
