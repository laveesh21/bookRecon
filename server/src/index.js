import 'dotenv/config'; 
import express from "express"
import cors from "cors"
import connectDb from "./config/db.js"
import authRoute from "./routes/authRoute.js"
import bookRoute from "./routes/bookRoute.js"

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: [
      "http://localhost:8081",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);



app.use("/api/auth", authRoute)
app.use("/api/books", bookRoute)

connectDb()
app.listen(PORT, () => {
  console.log("SERVER UP ON PORT ... " + PORT)
})
