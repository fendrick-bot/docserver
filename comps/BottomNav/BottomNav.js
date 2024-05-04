"use client";
import "@/comps/BottomNav/NavStyle.css";
import { GoHomeFill } from "react-icons/go";
import { BiSolidCloudUpload } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa6";
import { HiUser } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function BottomNav() {
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
      <div className="menu">
        <Link href={"/"}>
          <div
            className={active == 1 ? "menu-item active" : "menu-item inactive"}
            onClick={() => {
              setActive(1);
            }}
          >
            <div className="menu-item__icon">
              <GoHomeFill />
            </div>
            <div className="menu-item__text">Home</div>
          </div>
        </Link>
        <Link href={"/upload"}>
          <div
            className={active == 2 ? "menu-item active" : "menu-item inactive"}
            onClick={() => {
              setActive(2);
            }}
          >
            <div className="menu-item__icon">
              <BiSolidCloudUpload />
            </div>
            <div className="menu-item__text">Upload</div>
          </div>
        </Link>
        <Link href={"/saved"}>
          <div
            className={active == 3 ? "menu-item active" : "menu-item inactive"}
            onClick={() => {
              setActive(3);
            }}
          >
            <div className="menu-item__icon">
              <FaBookmark />
            </div>
            <div className="menu-item__text">Saved</div>
          </div>
        </Link>
        <Link href={"/profile"}>
          <div
            className={active == 4 ? "menu-item active" : "menu-item inactive"}
            onClick={() => {
              setActive(4);
            }}
          >
            <div className="menu-item__icon">
              <HiUser />
            </div>
            <div className="menu-item__text">Profile</div>
          </div>
        </Link>
      </div>
    </nav>
  );
}
