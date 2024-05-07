'use client'
import "@/comps/AllDoc/AllDocStyle.css"
import { useState, useEffect } from "react"
import Link from "next/link";
import toast from "react-hot-toast";

export function AllDoc(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        async function retriveData(){
            let docs = await fetch("/api/retrive");
            docs = await docs.json();
            setData(docs);
        }
        retriveData();
    }, [])

    function handleSave(item){
        let savedDoc = JSON.parse(localStorage.getItem("saved")) || [];
        const newDoc = {
            title: item.title,
            owner: item.owner,
            size: item.size,
            docUrl: item.docUrl,
        }
        let found = false;

        savedDoc.forEach((elem)=>{
            if(elem.docUrl === newDoc.docUrl) found = true;
        });
        if(!found){ savedDoc.push(newDoc); toast.success("File Saved!") }
        else toast.error("File already Added!")
        localStorage.setItem("saved", JSON.stringify(savedDoc));
    }

    return(
        <div id="main-content">
            <h1>Document List</h1>
            <br />

            {
                data.map((item)=>(
                    <div>
                    <Link href={`/document/${item.docUrl}`}>
                        <h1>{item.title}</h1>
                        <p>{item.owner} <br /> {item.size} </p>
                        <br />
                        <br />
                    </Link>
                    <br />
                        <button onClick={()=> handleSave(item)} >save</button>

                    </div>

                ))
            }
        </div>
    )
}