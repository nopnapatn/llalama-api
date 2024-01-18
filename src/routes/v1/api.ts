import { Router } from "express"
import { healthCheck } from "../../controllers/health"

const apiRouter = (): Router => {
  const api = Router()

  api.get("/", healthCheck)

  return api
}

export default apiRouter
