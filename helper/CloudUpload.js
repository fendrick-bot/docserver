import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "djtt5oivu",
  api_key: "524283999872251",
  api_secret: "sXOnf5A9BoqHQ-AURuZJE1ixrQ8",
});

const uploadFile = async(filePath)=>{
    try {
        if(!filePath) return null;
        const res = await cloudinary.uploader.upload(filePath, {resource_type:"auto"})
        console.log("File uploaded" , res);
        
    } catch (error) {
        console.log(error);
        return null;
        
    }
}

export {uploadFile};
// cloudinary.v2.uploader.upload("sample.pdf", function (error, result) {
//   console.log(result, error);
// });
