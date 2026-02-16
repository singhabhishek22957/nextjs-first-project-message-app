import { resend } from '@/lib/resend';
import { ApiResponse } from '@/types/apiResponse';
import {Resend} from 'resend';
import VerificationEmail from '../../emails/verificationEmails';




export async function sendVerificationEmail(email:string, username:string, otp:string):Promise<ApiResponse> {
    try {
         await resend.emails.send({
            from:"onboarding@resend.dev",
            to:email,
            subject:"Abhishek Singh || Verification Code ",
            react: VerificationEmail({username,otp}),
         });

      return {
            success:true,
            message:"Verification email send successfully",
            
        }  
    } catch (error) {
        console.error("Error sending Verification email.",error);
        return {
            success:false,
            message:"Error sending Verification email",

        }
        
        
    }
    
}
