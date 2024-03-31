
import { connect } from "@/Database/dbconfig";
import User from '@/datamodels/userModel';
import { NextResponse,NextRequest } from 'next/server';


connect();

export async function POST(request:NextRequest){
    try{
      
        const reqbody = await request.json();
        const {token} = reqbody;

        if(!token) return  NextResponse.json({error:"token not found"},{status:500});

        let user = await User.findOne({verifyToken:token, 
            verifyTokenExpiry:{$gt:Date.now()}
        });

        if(user){
        user.isVerified = true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        
        await user.save()

        return NextResponse.json({message:"verified successfully",success:true},{status:200})

        }else{
        return NextResponse.json({error:"invalid token"},{status:500})
        }

    }catch(e:any){
     return NextResponse.json({error:e.massage},{status:500})
    }
}
