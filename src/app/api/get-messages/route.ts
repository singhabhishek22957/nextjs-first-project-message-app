import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { User } from "next-auth";
import { Types } from "mongoose";

export async function GET(req: Request) {
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

  const userId = new Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: { "messages.createdAt": -1 },
      },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" },
        },
      },
    ]);


    if(!user || user.length === 0) {
      return Response.json({
        success: false,
        message: "user not found",
      }, {
        status: 404
      })
    }

    return Response.json({
      success: true,
      message: "All messages",
      messages: user[0].messages,
    },{
      status: 200
    });

    
  } catch (error) {
    console.error("Error to get all messages",error);

    return Response.json({
      success: false,
      message: "Error to get all messages",
    }, {
      status: 500
    })
  }
}
