import express from "express";
import controller from "../controllers/auth.controll";

const router = express.Router();

router.post("/login", controller.login);

export default { router };
