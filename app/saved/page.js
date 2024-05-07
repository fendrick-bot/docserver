'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { News_Cycle } from "next/font/google";
import toast from "react-hot-toast";

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
    
    <main>
      <br /><br /><br /><br />
      <h1>Saved Document List</h1>
            <br />

            {
                data.map((item)=>(
                    <div key={"newDoc"}>
                    <Link href={`/document/${item.docUrl}`} key={"newDoc"}>
                        <h1 key={"newDoc"}>{item.title}</h1>
                        <p key={"newDoc"}>{item.owner} <br /> {item.size} </p>
                        <br />
                        <br />
                    </Link>
                    <br />
                        <button key={"newDoc"} onClick={()=> handleRemove(item) } >remove</button>

                    </div>

                ))
            }
    
    </main>
  );
}
