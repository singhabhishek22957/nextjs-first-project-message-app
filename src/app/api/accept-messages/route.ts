import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from "next-auth";

export async function POST(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authorized",
      },
      {
        status: 401,
      },
    );
  }

  const userId = user._id;
  const { acceptMessages } = await req.json();

  try {

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { isAcceptingMessages: acceptMessages } },
      { new: true },
    );
    
    if (!updatedUser) {
      return Response.json({
        success: false,
        message: "User not found",
      },{
          status:401
      })
    }

    return Response.json({
      success: true,
      message: "User status updated successfully",
      updatedUser
    },{
        status:200
    })
    
  } catch (error) {
    
    console.error("Failed to update user status to accept messages");

    return Response.json({
      success: false,
      message: "Failed to update user status to accept messages",
    },{
        status:500
    })
    
  }




}


export async function GET(req:Request){
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Not Authorized",
        },
        {
          status: 401,
        },
      );
    }

    const userId = user._id;

     try {
        const foundUser = await UserModel.findById(userId);
   
        if(!foundUser){
           return Response.json({
               success:false,
               message:"User not found"
           },{
               status:404
           })
        }
   
        return Response.json({
           success:true,
           message:"User found successfully",
           isAcceptingMessages:foundUser.isAcceptingMessage
        },{
           status:200
        })
     } catch (error) {

        console.error("Failed to find user", error);

        return Response.json({
           success:false,
           message:"Error in getting messages from database"
        },{
           status:500
        })
        
     }

    
}



