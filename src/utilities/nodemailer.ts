import User from '@/datamodels/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';


var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b9df36e423a304",
    pass: "02bf972b742107"
  }
});



export const sendEmail = async(email:string,emailtype:string,userId:string)=>{
 try{

  const hashedtoken = await bcrypt.hash(userId.toString(),10)
  
  if(emailtype === "VERIFY"){
    await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashedtoken,verifyTokenExpiry:Date.now()+36000000}})
  }else  if(emailtype === "RESET"){
    await User.findByIdAndUpdate(userId,{$set:{forgotPasswordToken:hashedtoken,forgotPasswordExpiry:Date.now()+36000000}})
  }


const main = async()=> {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'rajumy123@gmail.com', // sender address
      to: "rajumy123@gmail.com, salomirod1999@gmail.com", // list of receivers
      subject: emailtype ==="VERIFY"?"Hello ✔ verify email":"Hello ✔ reset password", // Subject line
      text: emailtype ==="VERIFY"?"click here to verify":"click here to reset password", // plain text body
      html: `<p>Click <a href=${process.env.DOMAIN}/verifyemail?token=${hashedtoken}>here</a><br>
      or copy paste the link below in your browser.<br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedtoken}
      </br>
      </br></p>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  };
  
  await main().catch(console.error);
  
 }catch(e){
    console.log("error at sending mail.....")
 }
};



