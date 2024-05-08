"use client";
import "@/comps/BottomNav/NavStyle.css";
import { GoHomeFill } from "react-icons/go";
import { BiSolidCloudUpload } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function BottomNav() {
  const router = useRouter();
  const [active, setActive] = useState(1);
  useEffect(() => {
    const path = window.location.pathname;
    if (path == "/profile") setActive(4);
    else if (path == "/saved") setActive(3);
    else if (path == "/upload") setActive(2);
    else setActive(1);
  }, []);
  return (
    <nav>
      <hr />
      <div className="menu">
        {/* <Link href={"/"} className="nav-btns"> */}
          <div
            className={active == 1 ? "menu-item active" : "menu-item inactive"}
            onClick={() => {
              router.push("/")

              setActive(1);
              
            }}
          >
            <div className="menu-item__icon">
              <GoHomeFill />
            </div>
            <div className="menu-item__text">Home</div>
          </div>
        {/* </Link> */}
        {/* <Link href={"/upload"} className="nav-btns" >  */}
          <div
            className={active == 2 ? "menu-item active" : "menu-item inactive"}
            onClick={() => {
              router.push("/upload");
              setActive(2);
            }}
          >
            <div className="menu-item__icon">
            <MdCloudUpload />

            </div>
            <div className="menu-item__text">Upload</div>
          </div>
        {/* </Link> */}
        {/* <Link href={"/saved"} className="nav-btns"> */}
          <div
            className={active == 3 ? "menu-item active" : "menu-item inactive"}
            onClick={() => {
              setActive(3);
              router.push("/saved");
            }}
          >
            <div className="menu-item__icon">
            <FaStar />

            </div>
            <div className="menu-item__text">Saved</div>
          </div>
        {/* </Link> */}
        {/* <Link href={"/profile"} className="nav-btns"> */}
          <div
            className={active == 4 ? "menu-item active" : "menu-item inactive"}
            onClick={() => {
              setActive(4);
              router.push("/profile");
            }}
          >
            <div className="menu-item__icon">
              <HiUser />
            </div>
            <div className="menu-item__text">Profile</div>
          </div>
        {/* </Link> */}
      </div>
    </nav>
  );
}
