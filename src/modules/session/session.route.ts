import { Router } from "express"
import { sessionController } from "./session.module"

const sessionRoutes = Router()

sessionRoutes.get("/all", sessionController.getAllSession)
sessionRoutes.get("/", sessionController.getSession)
sessionRoutes.delete("/:id", sessionController.deleteSession)
sessionRoutes.delete("/delete/all", sessionController.deleteAllSessions)

export default sessionRoutes;