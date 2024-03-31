import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getdatafromtoken=async(request:NextRequest)=>{

    try{
     
        const token = request.cookies.get("token")?.value || "";
        const decode:any = jwt.verify(token,process.env.TOKEN_SECRET!);

        return decode.id
        

    }catch(e:any){
       throw new Error(e.message)
    }
}