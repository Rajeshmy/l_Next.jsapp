

import { connect } from "@/Database/dbconfig";
import User from '@/datamodels/userModel';
import { NextResponse,NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from "@/utilities/nodemailer";


connect();

export async function POST(request:NextRequest){
    try{
      const req = await request.json();
      
      const {username,email,password} = req;
      console.log(req,"req");
      
      const user = await User.findOne({email});

      if(user){
        return NextResponse.json({error:"user already exists"},{status:400})
      }
      
      // nested structure example
    //   bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash(password, salt, async function(err, hash) {
    //         // Store hash in your password DB.
    //         if(err && !hash){
    //           return NextResponse.json({error:"unexpected error"},{status:500})
    //         }
            
    //         const user = new User({
    //           username:username,
    //           email:email,
    //           password:hash
    //         });
            
           
    //         await user.save().then((res:any)=>{
    //           console.log(res);

    //         }).catch((err:any)=>{
    //           console.log(err)
    //           return NextResponse.json({error:"unexpected error while saving"},{status:500})
    //         });            
    //     });
    // });

    const salt = await bcrypt.genSalt(10);

    const hashedpass = await bcrypt.hash(password,salt);
    
    if(hashedpass){
            const user = new User({
              username:username,
              email:email,
              password:hashedpass
            });
          
          try{
            const saved = await user.save()
            
            console.log(saved);

            //email notification
            await sendEmail(email,"VERIFY",saved.userId);
            
            return NextResponse.json({error:"sign up successfull"},{status:200});

          }catch(e){
           return NextResponse.json({error:"unexpected error while saving",e},{status:500});

          }  
          
    }else{
      return NextResponse.json({error:"unexpected error"},{status:500})
    }



    }catch(err:any){
      return NextResponse.json({error:err.message},{status:500});
    }
};




