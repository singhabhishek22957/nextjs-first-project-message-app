import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUp.schema";
import { use } from "react";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(req: Request) {
    // todo use this in all route 

    if(req.method !== "GET"){
        return Response.json({
            success:false,
            message:"Method not allowed"
        },
        {
            status:405
        })
    }
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    // validate with zod ;
    const result = usernameQuerySchema.safeParse(queryParam);

    console.log("result:", result); // todo remove
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];

      return Response.json(
        {
          success: false,
          errors:
            usernameErrors?.length > 0
              ? usernameErrors.join(",")
              : "Invalid Query Param",
        },
        {
          status: 400,
        },
      );
    }

    const { username } = result.data;

    const existingVerifiedUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken ",
        },
        {
          status: 400,
        },
      );
    } else {
      return Response.json({
        success: true,
        message: "Username is available ",
      });
    }
  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      },
    );
  }
}
