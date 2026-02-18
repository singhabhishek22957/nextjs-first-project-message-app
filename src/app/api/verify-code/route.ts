import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { username, code } = await req.json();

    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({
      username: decodedUsername,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    const isCodeValid = user.verifyCode === code;

    const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        {
          status: 200,
        },
      );
    } else if (!isCodeExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code expired, Please signup again to get a new code",
        },
        {
          status: 400,
        },
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        {
          status: 400,
        },
      );
    }
  } catch (error) {
    console.log("Error in verify code", error);
    return Response.json(
      { success: false, message: "Error in verify code" },
      { status: 500 },
    );
  }
}
