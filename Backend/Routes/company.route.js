import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../Controllers/company.controller.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import {singleUpload} from '../Middlewares/multer.js'

const router = express.Router();


router.route("/Register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany)
router.route("/update/:id").post(isAuthenticated,singleUpload,updateCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById)


export default router;