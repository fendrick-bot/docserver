
import "@/app/profile/profileStyle.css"
import Image from "next/image";
import construction from "@/public/under-construction.png"
import Link from "next/link";
export default function Profile() {
  return (
    <div id="profile-main-div" >
        <h1>OOPS!</h1>
        <div id="construction_image"><Image src={construction} width={490} /></div>
        <h2>Under Construction</h2>
        <p>Website is under construction, as the page is not ready. kindly wait for the latest updates as the new features are coming soon on this website...</p>
        <br />
        <Link href={"/"} style={{width:'100%'}}><button id="back_home_btn"> Back to Home</button> </Link> 


    </div>
  );
}
