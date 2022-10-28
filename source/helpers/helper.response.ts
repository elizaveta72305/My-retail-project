import { Connection, SqlClient, Error, Query } from "msnodesqlv8";
import { DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorService } from "../services/error.service";

export class SqlHelper {
    static sql: SqlClient = require("msnodesqlv8");

    public static createNew<T>(query: string, original: T, ...params: (string | number)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            
            SqlHelper.openConnection()
                .then((connection: Connection) => {
                    const queries: string[] = [query, Queries.SelectIdentity];
                    const executedQuery: string = queries.join(";");
                    let executionCounter: number = 0;

                    connection.query(executedQuery, params, ( queryError: Error | undefined, queryResult: T[] | undefined) => {
                        if (queryError) {
                            reject("error");
                        }
                        else {
                            executionCounter++;
                            
                            if (executionCounter === queries.length) {
                                if (queryResult !== undefined) {
                                    if (queryResult.length === 1) {
                                        (original as any).id = (queryResult[0] as any).id;
                                        resolve(original);
                                    }
                                    else {
                                        reject(console.log("error!"));
                                    }
                                }
                                else {
                                    reject(
                                        console.log("error!")
                                        
                                    );
                                }
                            }
                        }
                    });
                })
                .catch((error: Error) => {
                    reject(console.log("error!")
                    );
                })
        });
    }

    public static executeQuerySingleResult<T>(errorService: ErrorService, query: string, ...params: (string | number)[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SqlHelper.openConnection()
                .then((connection: Connection) => {
                    connection.query(query, params, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                        if (queryError) {
                            reject("error in single result");
                        }
                        else {
                    
                            if (queryResult !== undefined) {
                                switch (queryResult.length) {
                                    case 0:
                                        reject("not found error!");
                                        break;
                            
                                    case 1:
                                        resolve(queryResult[0]);
                                        break;
                            
                                    default: // In case more than a single result is returned
                                        resolve(queryResult[0]);
                                        break;
                                }
                            }
                            else {
                                reject("not found error!");
                            }
                        }
                    });
                })
                .catch((error: Error) => {
                    reject(error);
                })
        });
    }




    public static openConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            SqlHelper.sql.open(DB_CONNECTION_STRING, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(
                        console.log("error!")
                    );
                }
                else {
                    resolve(connection);
                }
            });
        });
    }

}






