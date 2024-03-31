



import { connect } from "@/Database/dbconfig";
import { NextResponse,NextRequest } from 'next/server';


connect();

export async function GET(request:NextRequest){
    try{
      const response = NextResponse.json({message:"logout successfull",success:true});

      response.cookies.set("token","",{httpOnly:true});

      return response;
         
    }catch(err:any){
      return NextResponse.json({error:err.message},{status:500});
    }

  }



