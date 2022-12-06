import express from "express";
import controller from "../controllers/shop.controllers";
import authMiddleware from "../middleware/auth.middleware";
import { Role } from "../enums";

const router = express.Router();
//shops
router.get(
  "/all-shops",
  authMiddleware.verifyToken([Role.admin, Role.user]),
  controller.showAllShop
);
router.get("/one-shop/:id", controller.showShopById);
router.put(
  "/change-shop/:id",
  authMiddleware.verifyToken([Role.admin, Role.user]),
  controller.updateShopById
);
router.post(
  "/create-shop/",
  authMiddleware.verifyToken([Role.admin, Role.user]),
  controller.createShop
);
router.delete(
  "/delete-shop/:id",
  authMiddleware.verifyToken([Role.admin, Role.user]),
  controller.deleteShopId
);

//workers
router.get("/workers-oneshop/:id", controller.showWorkersShop);
router.get("/one-workerbyid/:id", controller.showWorkerById);
router.put("/change-workerinfo/:id", controller.updateWorkerById);
router.post("/create-worker/", controller.createWorker);

//product
router.get("/all-products/:id", controller.showProductinShop);
router.post("/create-product/", controller.createProduct);

export default { router };
