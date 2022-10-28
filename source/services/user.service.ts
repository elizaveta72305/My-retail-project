import { Connection, SqlClient, Error, Query } from "msnodesqlv8";
import {Queries} from "../constants";
import {productType, shopType, userType, workerType, user} from "../entities";
import { DB_CONNECTION_STRING } from "../constants";
import {SqlHelper} from "../helpers/helper.response"
import { ErrorService } from "./error.service";
import {DateHelper} from "../helpers/date.helper";
import {Status} from "../enums"



interface localUserType {
    user_id: number,
    first_name: string, 
    last_name: string,
    login: string, 
    password: string,
    role_id: string,
    create_date: Date,
    update_date: Date,
    create_user_id: number,
    update_user_id: number,
    status_id: number
}


export class UserService {
    constructor(
        private errorService: ErrorService
    ) { }

    public updateUserById(id: number, info: user): Promise<user> {
        return new Promise<user> ((resolve, reject) =>{
            
            const sql: SqlClient = require("msnodesqlv8");
            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.updateUserById;

            SqlHelper.openConnection() 
            .then((connection: Connection) => {
                const updateDate: Date = new Date();
                connection.query(query, [info.first_name, info.last_name, DateHelper.dateToString(updateDate), 2, Status.Active, id], (queryError: Error | undefined, queryResult: userType[] | undefined) => {     
                    resolve(info);
        })
        })
        .catch((error: Error) =>{
            reject(error)
         })
    })
}


public deleteUserById(id: number, info: user): Promise<user> {
    return new Promise<user> ((resolve, reject) =>{
        const query: string = Queries.deleteuserById;

        SqlHelper.openConnection() 
        .then((connection: Connection) => {
            const updateDate: Date = new Date();
            connection.query(query, [DateHelper.dateToString(updateDate), 1, Status.NotActive, id], (queryError: Error | undefined, queryResult: userType[] | undefined) => {     
                resolve(info);
    })
    })
    .catch((error: Error) =>{
        reject(error)
     })
})
}


}