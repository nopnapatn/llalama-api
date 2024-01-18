import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import errorHandler from "./middlewares/errorMiddleware"
import setUpRouter from "./routes"

const app = express()
const corsOptions = {
  origin: ["http://localhost:4000"],
  method: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Authorization"],
  credential: true,
}

app.use(express.json())
app.use(helmet())
app.use(cookieParser())
app.use(morgan("common"))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(cors(corsOptions))

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: ".env",
  })
}

setUpRouter(app)

app.use(errorHandler)

export default app
