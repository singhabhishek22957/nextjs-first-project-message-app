import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document{
    content : string,
    createdAt:Date,
}


const messageSchema : Schema<Message>= new Schema({
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true,
    }

})



export interface User extends Document{
    username:string,
    email:string,
    name:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isAcceptingMessage:boolean,
    isVerified:boolean,
    messages:Message[],
    createdAt:Date

}


const userSchema: Schema<User> = new Schema({
    username:{
        type:String, 
        required:[true,"username is required"],
        unique:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        trim:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please use a valid email address"],
        lowercase:true,
    },

    password:{
        type:String,
        required:[true,"password is required"],
        trim:true,
    },
    verifyCode:{
        type:String,
        required:[true,"verify code is required"],
        trim:true,
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verify code expiry is required"],
        trim:true,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
        required:[true,"is verified is required"],
    },
    messages:[messageSchema]

})


const UserModel = (mongoose.models.User as mongoose.Model<User>)|| mongoose.model<User>("User", userSchema);

export default UserModel;
