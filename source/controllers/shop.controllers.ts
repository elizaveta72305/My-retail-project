import { NextFunction, Request, Response, RequestHandler } from "express";
import { productType, shopType, workerType } from "../entities";
import { RetailService } from "../services/retail.service";
import { NON_EXISTENT_ID } from "../constants";
import { AuthenticatedRequest } from "../entities";

const retailService: RetailService = new RetailService();

const showAllShop: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log((req as AuthenticatedRequest).userData);

  retailService.showAllShop().then((result: shopType[]) => {
    return res.status(200).json({
      message: result,
    });
  });
};

const showShopById: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: number = -1;
  const sId: string = req.params.id;
  // console.log(req.params.id);

  if (sId !== undefined && sId !== null) {
    id = parseInt(sId);
  }

  if (id > 0) {
    retailService.showShopById(id).then((result: shopType) => {
      return res.status(200).json({
        result,
      });
    });
  }
};

const updateShopById: RequestHandler = (req, res, next) => {
  const shopId = req.params.id;
  const info = req.body.name;
  let id: number = -1;

  if (shopId !== undefined && shopId !== null) {
    id = parseInt(shopId);
  }
  //console.log(id, info);

  if (id > 0) {
    retailService
      .updateShopById(id, info, (req as any).userId)
      .then(() => {
        return res.status(200).json({});
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  }
};

const createShop: RequestHandler = (req, res, next) => {
  const info = req.body;

  if (info) {
    retailService
      .createShop(
        {
          id: NON_EXISTENT_ID,
          name: info.name,
        },
        (req as any).userId
      )
      .then((result: shopType) => {
        return res.status(200).json({});
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
};

const deleteShopId: RequestHandler = (req, res, next) => {
  let id: number = -1;
  const sId: string = req.params.id;

  if (sId !== undefined && sId !== null) {
    id = parseInt(sId);
  }
  if (id > 0) {
    retailService
      .deleteShopId(id, (req as any).userId)
      .then(() => {
        return res.status(200).json({});
      })
      .catch((error: Error) => {});
  }
};

const showWorkersShop: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: number = -1;
  const sId: string = req.params.id;

  if (sId !== undefined && sId !== null) {
    id = parseInt(sId);
  }

  if (id > 0) {
    retailService.showWorkersShop(id).then((result: shopType[]) => {
      return res.status(200).json({
        result,
      });
    });
  }
};

const showWorkerById: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: number = -1;
  const sId: string = req.params.id;

  if (sId !== undefined && sId !== null) {
    id = parseInt(sId);
  }

  if (id > 0) {
    console.log(id);

    retailService.showWorkerById(id).then((result: workerType) => {
      return res.status(200).json({
        result,
      });
    });
  }
};

const updateWorkerById: RequestHandler = (req, res, next) => {
  const shopId = req.params.id;
  const name = req.body.name;
  const position = req.body.position;

  let id: number = -1;

  if (shopId !== undefined && shopId !== null) {
    id = parseInt(shopId);
  }
  //console.log(id, info);

  if (id > 0) {
    retailService
      .updateWorkerById(id, name, position)
      .then(() => {
        return res.status(200).json({});
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
};

const createWorker: RequestHandler = (req, res, next) => {
  const info = req.body;

  if (info) {
    retailService
      .createWorker({
        id: NON_EXISTENT_ID,
        name: info.name,
        position: info.position,
        store_id: info.store_id,
      })
      .then(() => {
        return res.status(200).json({});
      })

      .catch((e: Error) => {
        console.log(e.message);
      });
  }
};

const showProductinShop: RequestHandler = (req, res, next) => {
  let id: number = -1;
  const sId: string = req.params.id;

  if (sId !== undefined && sId !== null) {
    id = parseInt(sId);
  }

  if (id) {
    retailService.showProductinShop(id).then((result: productType[]) => {
      return res.status(200).json({
        result,
      });
    });
  }
};

const createProduct: RequestHandler = (req, res, next) => {
  const info = req.body;

  if (info) {
    retailService
      .createProduct({
        id: NON_EXISTENT_ID,
        name: info.name,
        store: info.store_id,
        category_product_id: info.category_product_id,
      })
      .then(() => {
        return res.status(200).json({
          message: "Created!",
        });
      })

      .catch((e: Error) => {
        console.log(e.message);
      });
  }
};

export default {
  showAllShop,
  showShopById,
  updateShopById,
  createShop,
  deleteShopId,
  showWorkersShop,
  showWorkerById,
  updateWorkerById,
  createWorker,
  showProductinShop,
  createProduct,
};
