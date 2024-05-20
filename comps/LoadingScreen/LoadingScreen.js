import "@/comps/LoadingScreen/LoadingScreenStyle.css";
import Image from "next/image";
import mainLogo from "@/public/mainlogo.png";

export function LoadingScreen() {
  return (
    <div id="ripple-div">
        <div id="header">
        <Image id="min-logo" src={mainLogo} width={100} height={100} alt="loading" />
        <div className="ripple-1"></div>
        <div className="ripple-2"></div>
        <div className="ripple-3"></div>
        <div className="ripple-4"></div>
        <div className="ripple-5"></div>
        </div>
    </div>
  );
}
