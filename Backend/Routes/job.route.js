import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { adminJobs, findJobById, getAllJobs, postJob } from "../Controllers/job.controller.js";

const router = express.Router();


router.route("/Post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/get/:id").get(findJobById);
router.route("/getAdminJobs").get(isAuthenticated,adminJobs);


export default router;