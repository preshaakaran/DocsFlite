import mongoose from "mongoose";

const connectToDB = async ()=>{
    const connectionUrl ="your_url"
    mongoose.connect(connectionUrl).then(()=>console.log("Database Connected")).catch((e)=>console.log(e));
    

};


export default connectToDB;

