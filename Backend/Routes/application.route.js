import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../Controllers/Application.controller.js";

const router = express.Router();


router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJobs)
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/Status/:id/update").post(isAuthenticated,updateStatus);


export default router;