import { NextFunction, Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NON_EXISTENT_ID, TOKEN_SECRET } from "../constants";
import { ErrorService } from "../services/error.service";
import { AuthenticationService } from "../services/auth.service";
import { shopType, systemError, jwtUserData } from "../entities";
import { UserService } from "../services/user.service";
import { AuthenticatedRequest } from "../entities";

const errorService: ErrorService = new ErrorService();
const userService: UserService = new UserService(errorService);

const updateUserById: RequestHandler = (req, res, next) => {
  const userId = req.params.id;
  const info = req.body;
  let id: number = -1;

  if (userId !== undefined && userId !== null) {
    id = parseInt(userId);
  }

  if (id > 0) {
    userService
      .updateUserById(id, info)

      .then(() => {
        return res.status(200).json({});
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
};

const deleteUserById: RequestHandler = (req, res, next) => {
  const userId = req.params.id;
  const info = req.body;
  let id: number = -1;

  if (userId !== undefined && userId !== null) {
    id = parseInt(userId);
  }

  if (id > 0) {
    userService
      .deleteUserById(id, info)

      .then(() => {
        return res.status(200).json({
          message: " deleted successfully",
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
};

export default { updateUserById, deleteUserById };
