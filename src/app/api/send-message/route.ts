import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/user.model";


export async function POST(req:Request){
    await dbConnect();

    const {username, content} = await req.json();

    try {
        const user =  await UserModel.findOne({username});

        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{
                status:404
            })
        }

        // isUserAccepting the messages 

        if(!user.isAcceptingMessage){
            return Response.json({
                success:false,
                message:"User is not accepting messages"
            },{
                status:403
            })
        }

        const newMessage = {content, createdAt:new Date()};
         user.messages.push(newMessage as Message); 
        await user.save();

        return Response.json({
            success:true,
            message:"Message sent successfully"
        },{
            status:200
        })
        
    } catch (error) {

        console.error("Error to send messages", error);
        return Response.json({
            success:false,
            message:"Error to send messages"
        },{
            status:500
        })
        
        
    }
}

