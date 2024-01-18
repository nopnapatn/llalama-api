import { Router } from "express"
import { healthCheck } from "../controllers/health"

const webRouter = (): Router => {
  const web = Router()

  web.get("/", healthCheck)

  return web
}

export default webRouter
