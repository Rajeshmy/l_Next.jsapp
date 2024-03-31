import { connect } from "@/Database/dbconfig";
import { getdatafromtoken } from "@/utilities/datafromtkn";
import { NextRequest,NextResponse } from "next/server";
import User from "@/datamodels/userModel";

connect();

export async function POST(request:NextRequest){

    const userid= await getdatafromtoken(request);

    const user = await User.findOne({_id:userid}).select("-password")
    
    if(!user) return NextResponse.json({message:"not found"},{status:400})

    return NextResponse.json({message:"Userfound",data:user})

}

