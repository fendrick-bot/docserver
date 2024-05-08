import "@/comps/TopNav/TopNavStyle.css";
import { TbFileText } from "react-icons/tb";

import Image from "next/image";
import mainLogo from "@/public/mainlogo.png";

export function TopNav() {
  return (
    <div id="nav_main">
      <div id="logo">
        <div id="logo_img">
          <Image
            src={mainLogo}
            alt="main logo"
            style={{ width: "100%", height: "auto" }}
            unoptimized
            priority
          />
        </div>
        <h1>Cloud Panda</h1>
      </div>
      <hr />
    </div>
  );
}
