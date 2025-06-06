import { Router } from "express";
import { TreatmentController } from "./treatment.controller";
import { treatmentController } from "./treatment.module";
import { authenticateJWT } from "../../common/strageties/jwt.strategy";

const treatmentRoute = Router();


treatmentRoute.post("/create/", authenticateJWT, treatmentController.addTreatment);
treatmentRoute.put("/update/:id", authenticateJWT, treatmentController.updateTreatment);
treatmentRoute.get("/patient/:id", authenticateJWT, treatmentController.getPatientTreatments);
treatmentRoute.get("/individual/:id", authenticateJWT, treatmentController.getTreatmentById);
treatmentRoute.delete("/delete/:id", authenticateJWT, treatmentController.deleteTreatment);
treatmentRoute.get("/patientAll", authenticateJWT, treatmentController.getAllTreatment)
treatmentRoute.get("/students", authenticateJWT, treatmentController.getAllStudents)

export default treatmentRoute;
