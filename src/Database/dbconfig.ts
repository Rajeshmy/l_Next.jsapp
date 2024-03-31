import mongoose from "mongoose";


export async function connect(){
    try{
    await mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection;

    connection.on("connected",()=>{
      console.log("connected to datbase")
    });

    connection.on("error",(err)=>{
        console.log("error at database",err);
        process.exit();
      });

    }catch(error){
      console.log(error,"db err")
    }
};