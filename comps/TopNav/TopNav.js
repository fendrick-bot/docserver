import "@/comps/TopNav/TopNavStyle.css";
import { TbFileText } from "react-icons/tb";

import Image from "next/image";
import mainLogo from "@/public/mainlogo.png"

export function TopNav(){
    return(
        <div id="nav_main">
            <div id="logo">
                <div id="logo_img"><TbFileText /></div>
                <h1>Doc Server</h1>
            </div>
        </div>
    )
}