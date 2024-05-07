'use client'
import "@/comps/GetStarted/GetStartedStyle.css";
import { TbFileText } from "react-icons/tb";

import Image from "next/image";
import mainLogo from "@/public/mainlogo.png"

import { useState, useEffect } from "react";
import { TopNav } from "../TopNav/TopNav";
import { BottomNav } from "../BottomNav/BottomNav";

export function GetStarted(props){
    console.log(props.data);
    const [newUser, setUser] = useState(true);
    useEffect(()=>{
        if(localStorage.getItem("newUser") != null){
            setUser(false);
        }
    }, []);
    function removeSplash(){
        localStorage.setItem("newUser", false);
        setUser(false);
    }
    return(
        (newUser)?<div id="splash-page">
            <div id="big-logo">
                <Image src={mainLogo} unoptimized/> 
            </div>
            <br />
            <br />
            <h1 id="splash-sub-head">Share files easily with  your friends</h1>
            <p id="splash-para-text">Cloud Panda provides you the best services for uploading your files and share them with your friends</p>

            <button id="splash-start-button" onClick={removeSplash}>Get Started ▶️</button>

        </div>:
        <div>
            <TopNav/>
            {props.data}
            <BottomNav/>
        </div>
    )
}