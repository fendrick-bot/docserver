import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    title: {
        type:String,
        required: [true,  "please provide a title"],
    },
    docUrl:{
        type:String,
        required: [true,  "please provide a url"],
        unique: true,
    },
    owner:{
        type:String,
        required: [true,  "please provide a owner name"],
        default : "Fendrick"
    }
})

const Doc = mongoose.models.Docs || mongoose.model("Docs" , docSchema);
export default Doc;

