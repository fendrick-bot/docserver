
import axios from "axios";

export default async function retriver(){
    try {
        let res = await axios.get("/api/retrive");
        // res = await res.json();
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}