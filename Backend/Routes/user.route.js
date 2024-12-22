import express from "express";
import { login, logout, register, updateProfile } from "../Controllers/user.controller.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { singleUpload } from "../Middlewares/multer.js";
const router = express.Router();


router.route("/Register").post(singleUpload,register);
router.route("/Login").post(login)
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile)
router.route("/logout").get(logout)


export default router;