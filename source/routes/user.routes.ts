import express from "express";
import controller from "../controllers/user.controllers";

const router = express.Router();

router.put("/change/:id", controller.updateUserById);
router.delete("/delete/:id", controller.deleteUserById);

export default { router };
