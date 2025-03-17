import { Router } from "express";
import { TreatmentController } from "./treatment.controller";
import { treatmentController } from "./treatment.module";
import { authenticateJWT } from "../../common/strageties/jwt.strategy";

const treatmentRoute = Router();


treatmentRoute.post("/", authenticateJWT, treatmentController.addTreatment);
treatmentRoute.put("/:id", authenticateJWT, treatmentController.updateTreatment);
treatmentRoute.get("/patient/:id", authenticateJWT, treatmentController.getPatientTreatments);
treatmentRoute.get("/:id", authenticateJWT, treatmentController.getTreatmentById);
treatmentRoute.delete("/:id", authenticateJWT, treatmentController.deleteTreatment);

export default treatmentRoute;
