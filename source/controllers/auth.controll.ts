import { NextFunction, Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { NON_EXISTENT_ID, TOKEN_SECRET } from "../constants";
import { ErrorService } from "../services/error.service";
import { AuthenticationService } from "../services/auth.service";
import { shopType, systemError, jwtUserData, authenticationToken} from "../entities";


interface localUser {
    login: string;
    password: string;
}

const errorService: ErrorService = new ErrorService();
const authenticationService: AuthenticationService = new AuthenticationService(errorService);

const login = async (req: Request, res: Response, next: NextFunction) => {
    const user: localUser = req.body;

    authenticationService.login(user.login, user.password)
        .then((userData: jwtUserData) => {

            const authenticationToken: authenticationToken = {
                userData: userData
            }

            const token: string = jwt.sign(
                authenticationToken,
                TOKEN_SECRET,
                {
                    expiresIn: "12h",
                });

            return res.status(200).json({
                token: token
            });
        })
        .catch((error: systemError) => {
            return "auth error!";
        });
};





export default { login };