import mongoose from "mongoose"

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL as string, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB is connected with server: ${data.connection.host}`)
    })
    .catch((e) => {
      console.error("MongoDB connection error:", e.message)
    })
}

export default connectDatabase
