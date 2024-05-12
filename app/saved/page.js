'use client'
import "@/app/saved/savedStyle.css"
import { useState, useEffect } from "react";
import Link from "next/link";
import { News_Cycle } from "next/font/google";
import toast from "react-hot-toast";
import { PdfBox } from "@/comps/PdfBox/PdfBox";

export default function Saved() {
  
  const [data, setData] = useState([]);
    useEffect(()=>{
        async function retriveData(){
          let savedDoc = JSON.parse(localStorage.getItem("saved")) || [];
          setData(savedDoc);
        }
        retriveData();
    }, [])

    function handleRemove(item){
      let savedDoc = JSON.parse(localStorage.getItem("saved")) || [];
      const newSaved = savedDoc.filter((elem) => elem.docUrl !== item.docUrl);
      setData(newSaved);
      localStorage.setItem("saved", JSON.stringify(newSaved));
      toast.success("Removed from saved!")
  }
  return (
    
    <div id="saved-main-div">
      <h2>Saved Documents</h2>

            {
                data.map((item)=>(
                  <PdfBox data={item} key={"pdf-box-main"} />
                    // <div key={"newDoc"}>
                    // <Link href={`/document/${item.docUrl}`} key={"newDoc"}>
                    //     <h1 key={"newDoc"}>{item.title}</h1>
                    //     <p key={"newDoc"}>{item.owner} <br /> {item.size} </p>
                    //     <br />
                    //     <br />
                    // </Link>
                    // <br />
                    //     <button key={"newDoc"} onClick={()=> handleRemove(item) } >remove</button>

                    // </div>
                ))
            }
    </div>
  );
}
