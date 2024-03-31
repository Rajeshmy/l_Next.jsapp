

import { connect } from "@/Database/dbconfig";
import User from '@/datamodels/userModel';
import { NextResponse,NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



connect();

export async function POST(request:NextRequest){
    try{
      const req = await request.json();
      
      const {email,password} = req;
      console.log(req,"req");
      
      const user = await User.findOne({email});

      if(user){

        let hashedpass = user.password;

        let pass = await bcrypt.compare(password,hashedpass);

        if(pass){
           
          const token = jwt.sign({username:user.username,email:user.email,id:user._id},process.env.TOKEN_SECRET!,{expiresIn:"1d"});
          
          if(token){
            user.verifyToken=token,
            user.verifyTokenExpiry=Date.now()+3600000;

            await user.save();
          }

          const response = NextResponse.json({success:true,message:"logged in successfully",token:token});

          response.cookies.set("token",token,{httpOnly:true});

          return response;

        }else{
          return NextResponse.json({error:"wrong credentials"},{status:400})
        }
      }else{
        return NextResponse.json({error:"user already exists"},{status:400})
      }
    }catch(err:any){
      return NextResponse.json({error:err.message},{status:500});
    }
  }



