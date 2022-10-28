import { Connection, SqlClient, Error, Query } from "msnodesqlv8";
import {Queries} from "../constants";
import {productType, shopType, workerType} from "../entities";
import { DB_CONNECTION_STRING } from "../constants";
import {SqlHelper} from "../helpers/helper.response"
import { ShorthandPropertyAssignment } from "typescript";

interface Retail {
    showAllShop(): Promise<shopType[]>;
    showShopById(id_store: number): Promise<shopType>;
    updateShopById(id: number, name: string, uderId: number): Promise<void>;
    createShop(info: shopType, userId: number): Promise<shopType>
    deleteShopId(id: number, userId: number):Promise<void>;
    showWorkersShop(id: number): Promise<workerType[]>;
    showWorkerById(id: number): Promise<shopType>;
    updateWorkerById(id: number, name: string, position: string): Promise<void>;
};

interface localStoreType {
    id_store: number;
    stores: string;
}

interface localWorkerType {
    id_employees: number;
    name_of_employee: string,
    position: string,
    store_id: number;
}

interface localProductType {
    id_product: number;
    name: string,
    store_id: number,
    category_product_id: number;
}

export class RetailService implements Retail {

    public showAllShop(): Promise<shopType[]> {
        return new Promise<shopType[]> ((resolve, reject) =>{
            
            const sql: SqlClient = require("msnodesqlv8");
            const query: string = "SELECT * FROM stores";
            const result: shopType[] = [];
            const connectionString: string = DB_CONNECTION_STRING;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                connection.query(query, (queryError: Error | undefined, queryResult: localStoreType[] | undefined) => {
                    
                    if (queryResult !== undefined){
                        queryResult.forEach(shop => {
                            result.push(
                                this.parsLocalStoreType(shop)
                            )
                        });
                    } resolve(result);

                }
                )
            });
           
        })
    }

    public showShopById(id: number): Promise<shopType> {
        return new Promise<shopType> ((resolve, reject) =>{
            
            const sql: SqlClient = require("msnodesqlv8");
            let result: shopType;
            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.shopid;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: localStoreType[] | undefined) => {
                    
                    if (queryResult !== undefined && queryResult.length === 1){
                            result = this.parsLocalStoreType(queryResult[0])
                    }
                    resolve(result);
                }
                )
            });
           
        })
    }

    public updateShopById(id: number, name: string, userId: number): Promise<void> {
        return new Promise<void> ((resolve, reject) =>{
            
            const sql: SqlClient = require("msnodesqlv8");
            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.shopidupdate;
            
            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                connection.query("UPDATE stores SET stores = ? WHERE id_store = ?", [name, id], (queryError: Error | undefined, queryResult: localStoreType[] | undefined) => {
                    console.log(queryResult);
                    
                    // if (queryResult !== undefined && queryResult.length === 1){
                    //         return;
                    // }
                    resolve();
                }
                )
            });
           
        })
    }

    public createShop(info: shopType, userId: number): Promise<shopType> {
        return new Promise<shopType> ((resolve, reject) =>{

            SqlHelper.createNew<shopType>(Queries.createshop, info, info.name) 
            .then((result: shopType) => {
                resolve(result);
            }) 
            .catch((error: Error) => {
                reject(error);
            })
        })
    }

    public deleteShopId (id: number, userId: number): Promise<void> {
        return new Promise<void> ((resolve, reject) =>{
            
            const query: string = Queries.shopid;

            SqlHelper.openConnection() 
            .then((connection: Connection) =>{
                let query = Queries.deleteshopid;

                connection.query(query, [id], (queryError: Error | undefined, queryResult: string[] | number[] | undefined) => {
                    if (queryError) {
                        reject("error");
                    }
                    else {
                        console.log("");
                        
                    }
                })
        resolve();
    })
})}

public showWorkersShop(id: number): Promise<workerType[]> {
    return new Promise<workerType[]> ((resolve, reject) =>{
        
        //const sql: SqlClient = require("msnodesqlv8");
        let result: workerType[] = [];
       // const connectionString: string = DB_CONNECTION_STRING;
       const query: string = Queries.workersShopId;

        SqlHelper.openConnection() 
        .then((connection: Connection) =>{

            connection.query(query, [id], (queryError: Error | undefined, queryResult: localWorkerType[] | undefined) => {            
                if(queryResult) { 
                    queryResult.forEach(a => {
                        result.push(
                            this.parsLocalWorkerType(a)
                        )
                    })
                }
                
                resolve(result);
            })
            
        });
       
    })
}

public showWorkerById(id: number): Promise<workerType> {
    return new Promise<workerType> ((resolve, reject) =>{
        
        const sql: SqlClient = require("msnodesqlv8");
        let result: workerType;
        const connectinString: string = DB_CONNECTION_STRING;
        const query: string = Queries.employeById;

        sql.open(connectinString, (connectionError: Error, connection: Connection) => {

            connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: localWorkerType[] | undefined) => {
                
                if (queryResult !== undefined && queryResult.length === 1){
                        result = this.parsLocalWorkerType(queryResult[0])
                }                
                resolve(result);
                
            }
            )
        });
    })
}

public updateWorkerById(id: number, name: string, position: string): Promise<void> {
    return new Promise<void> ((resolve, reject) =>{
        
        const sql: SqlClient = require("msnodesqlv8");
        const connectionString: string = DB_CONNECTION_STRING;
        const query: string = Queries.workerupdate;
        
        sql.open(connectionString, (connectionError: Error, connection: Connection) => {
            connection.query("UPDATE employees SET name_of_employee = ?, position = ? WHERE id_employees = ?", [name, position, id], (queryError: Error | undefined, queryResult: localWorkerType[] | undefined) => {
                console.log(queryResult);
                
                // if (queryResult !== undefined){
                //         return "succsess";
                // }
                
            })
        });
        resolve();
    })
}

public createWorker (body: workerType): Promise<workerType>{
    return new Promise<workerType>((resolve, reject) => {
        SqlHelper.createNew<workerType>(Queries.createworker, body, body.name, body.position, body.store_id)
         .then((result: workerType) =>{
            resolve(result)
         })
         .catch((error: Error) =>{
            reject(error)
         })
    })
}


public showProductinShop (id: number): Promise<productType[]> {
return new Promise<productType[]> ((resolve, reject) =>{
        
    let result: productType[] = [];
   const query: string = Queries.showProdByIdShop;

    SqlHelper.openConnection() 
    .then((connection: Connection) =>{

        connection.query(query, [id], (queryError: Error | undefined, queryResult: localProductType[] | undefined) => {            
            if(queryResult) { 
                queryResult.forEach(a => {
                    result.push(
                        this.parsLocalProductType(a)
                    )
                })
            }
            
            resolve(result);
        })
        
    });
   
})
}

public createProduct (body: productType): Promise<string>{
    return new Promise<string>((resolve, reject) => {
        SqlHelper.openConnection() 
    .then((connection: Connection) =>{

        connection.query(Queries.createProduct, [body.name, body.store, body.category_product_id], (queryError: Error | undefined, queryResult: localProductType[] | undefined) => {
            if(queryResult){
                resolve("Product created!")
                 
            }
         })
        
    })
})
}

private parsLocalStoreType (local: localStoreType): shopType {
    return {
    id: local.id_store,
    name: local.stores
    }
}
private parsLocalWorkerType (local: localWorkerType): workerType {
    return {
    id: local.id_employees,
    name: local.name_of_employee,
    position: local.position,
    store_id: local.store_id
    }
}

private parsLocalProductType (local: localProductType): productType {
    return {
    id: local.id_product,
    name: local.name,
    store: local.store_id,
    category_product_id: local.category_product_id
    }
}
}

