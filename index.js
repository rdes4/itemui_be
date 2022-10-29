import express from "express";
import FIleUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config();

import ItemRoute from "./routes/ItemRoute.js"
import UserRoute from "./routes/UserRoute.js"


const app = express();

app.use(cors({
    credentials:true,
    origin:true
}));
app.use(express.json());
app.use(FIleUpload());
app.use(express.static("public"))
app.use(cookieParser());
app.use(ItemRoute);
app.use(UserRoute);

app.listen(5000, function(){
    console.log("Server Running...")
})