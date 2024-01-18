import cloudinary from "cloudinary"
import dotenv from "dotenv"
import app from "./app"
import ConnectDatabase from "./db/db"

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server for Handling uncaught Exception`)
})

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: ".env",
  })
}

ConnectDatabase()

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

process.on("unhandledRejection", (e: any) => {
  console.log(`Shutting down server for ${e.message}`)
  console.log(`Shutting down the server due to Unhandled promise rejection`)
  server.close(() => {
    process.exit(1)
  })
})
