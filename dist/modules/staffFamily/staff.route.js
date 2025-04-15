"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_strategy_1 = require("../../common/strageties/jwt.strategy");
const staff_module_1 = require("./staff.module");
const StaffRoute = (0, express_1.Router)();
StaffRoute.post("/create/", jwt_strategy_1.authenticateJWT, staff_module_1.staffController.createFamilyMember);
StaffRoute.get("/:staff_id", jwt_strategy_1.authenticateJWT, staff_module_1.staffController.getFamilyMembers);
StaffRoute.get("/all/:staff_id", jwt_strategy_1.authenticateJWT, staff_module_1.staffController.getAllFamilyMembers);
StaffRoute.put("/update/:id", jwt_strategy_1.authenticateJWT, staff_module_1.staffController.updateFamilyMember);
StaffRoute.delete("/delete/:id", jwt_strategy_1.authenticateJWT, staff_module_1.staffController.deleteFamilyMember);
StaffRoute.delete("/hard-delete/:id", jwt_strategy_1.authenticateJWT, staff_module_1.staffController.hardDeleteFamilyMember);
exports.default = StaffRoute;
