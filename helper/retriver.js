import axios from "axios";
export default async function retriver() {
  try {
    let docs = await fetch("/api/retrive", { cache: 'no-cache' });
    docs = await docs.json();
    // console.log(docs);
    return docs;
  } catch (error) {
    console.log(error);
    return [];
  }
}
