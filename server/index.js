import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comments.js"
import videoRoutes from "./routes/videos.js"
import cookieParser from "cookie-parser"


const app = express()
dotenv.config()



mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err)
})

app.listen(5000, () => {
    console.log("Connected to server!")
})



app.use(cookieParser())
app.use(express.json()) // json formatındaki gelen body'lerini handle etmeyi sağlar.
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

