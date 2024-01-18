import { Express } from "express"
import apiRouter from "./v1/api"
import webRouter from "./web"

const setUpRouter = (app: Express) => {
  app.use("/", webRouter())
  app.use("/api/v1", apiRouter())
}

export default setUpRouter
