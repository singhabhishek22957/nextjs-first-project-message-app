
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection : ConnectionObject = {};

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected database");
        return;
        
    }

    try{
        console.log(process.env.MONGODB_URI, process.env.DB_NAME);

        const db = await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`);

       connection.isConnected = db.connections[0].readyState ;
       console.log("Db Connected Successfully");
       
    }catch(error){
        console.log("database connection failed", error);
        process.exit(1);
    }
}


export default dbConnect;