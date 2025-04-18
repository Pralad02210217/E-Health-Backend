"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const illness_module_1 = require("./illness.module");
const jwt_strategy_1 = require("../../common/strageties/jwt.strategy");
const illnessRoute = (0, express_1.Router)();
illnessRoute.post("/create/", jwt_strategy_1.authenticateJWT, illness_module_1.illnessController.createIllness);
illnessRoute.get("/", jwt_strategy_1.authenticateJWT, illness_module_1.illnessController.getIllnesses);
illnessRoute.get("/:id", jwt_strategy_1.authenticateJWT, illness_module_1.illnessController.getIllnessById);
illnessRoute.put("/update/:id", jwt_strategy_1.authenticateJWT, illness_module_1.illnessController.updateIllness);
illnessRoute.delete("/delete/:id", jwt_strategy_1.authenticateJWT, illness_module_1.illnessController.deleteIllness);
exports.default = illnessRoute;
