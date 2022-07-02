import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";


const app = express();
dotenv.config();
// const mongodbUrl = process.env.MONGODB_URL;
const port = process.env.PORT || 5000; // Heruko will add port by itself from env variable


app.use(morgan("dev"));
app.use(cors());
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

app.use("/users", userRouter);
app.use("/tours", tourRouter);



mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`);
    });
}).catch((error)=>{
    console.log(error);
})


