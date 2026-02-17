import { resend } from '@/lib/resend';
import { ApiResponse } from '@/types/apiResponse';
import VerificationEmail from '../../emails/verificationEmails';




export async function sendVerificationEmail(email:string, username:string, otp:string):Promise<ApiResponse> {
    try {
         await resend.emails.send({
            from:"onboarding@resend.dev",
            to:[email],
            subject:"Abhishek Singh || Verification Code ",
            react: VerificationEmail({username,otp}),
         });

      return {
            success:true,
            message:"Verification email sent successfully",
            
        }  
    } catch (error) {
        console.error("Error sending Verification email.",error);
        return {
            success:false,
            message:"Error sending Verification email",

        }
        
        
    }
    
}
