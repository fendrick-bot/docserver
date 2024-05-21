"use client";
import "@/comps/GetStarted/GetStartedStyle.css";
import Image from "next/image";
import mainLogo from "@/public/mainlogo.png";

import { useState, useEffect } from "react";
import { TopNav } from "../TopNav/TopNav";
import { BottomNav } from "../BottomNav/BottomNav";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";

export function GetStarted(props) {
  const [newUser, setUser] = useState(true);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("newUser") != null) {
      setUser(false);
    }
    function myStopFunction() {
      setLoading(false);
      clearTimeout(myTimeout);
    }
    const myTimeout = setTimeout(myStopFunction, 2000);
  }, []);
  function removeSplash() {
    localStorage.setItem("newUser", false);
    setUser(false);
  }
  return isLoading ? (
    <LoadingScreen />
  ) : newUser ? (
    <div id="splash-page">
      <div id="big-logo">
        <Image
          src={mainLogo}
          alt="main logo"
          style={{ width: "100%", height: "auto" }}
          unoptimized
        />
      </div>
      <br />
      <br />
      <h2 id="splash-sub-head">CLOUD PANDA</h2>
      <p id="splash-para-text">
        Share files easily with your friends. cloud Panda provides you the best
        services for uploading your files and share them with your friends
      </p>
      <button id="splash-start-button" onClick={removeSplash}>
        Get Started ▶
      </button>
    </div>
  ) : (
    <div id="home-page-div">
      <TopNav />
      {props.data}
      <BottomNav />
    </div>
  );
}
