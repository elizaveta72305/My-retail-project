import { SqlHelper } from "../helpers/helper.response";
import {Queries} from "../constants";
import { Connection, SqlClient, Error, Query } from "msnodesqlv8";
import bcrypt from "bcryptjs";
import { entityWithId, jwtUserData, systemError } from "../entities";
import { DB_CONNECTION_STRING } from "../constants";
import { AppError, Role } from "../enums";
import { ErrorService } from "./error.service";


interface localUser extends entityWithId {
    password: string,
    role_id: Role;
}

interface IAuthenticationService {
    login(login: string, password: string): Promise<jwtUserData>;
}

export class AuthenticationService implements IAuthenticationService {

    constructor(
        private errorService: ErrorService
    ) { }

    public login(login: string, password: string): Promise<jwtUserData> {
        return new Promise<jwtUserData>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localUser>(this.errorService, Queries.getUserByLogin, login)
                .then((user: localUser) => {
                    if (bcrypt.compareSync(password, user.password)) {
                        const result: jwtUserData = {
                            userId: user.id_user,
                            roleId: user.role_id
                        }
                        resolve(result);
                    }
                    else {
                        reject(this.errorService.getError(AppError.NoData));
                    }
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }
}


    


