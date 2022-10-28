import { Request } from "express";
import { AppError } from "../source/enums";
import { Role } from "../source/enums";

export interface shopType{
    id: number,
    name: string;
}

export interface userType{
    id_user: string,
    first_name: string, 
    last_name: string,
    login: string, 
    password: string,
    role_id: number,
    create_date: Date,
    update_date: Date, 
    create_user_id: number,
    update_user_id: number,
    status_id: number;
}

export interface user extends entityWithId {
    first_name: string;
    last_name: string;
    login?: string;
    password?: string;
}

export interface workerType{
    id: number,
    name: string,
    position: string,
    store_id: number;
}

export interface productType{
    id: number,
    name: string,
    store: number,
    category_product_id: number;
}

export interface entityWithId {
    id_user: number;
}

export interface systemError {
    key: AppError;
    code: number;
    message: string;
}

export interface jwtUserData {
    userId: number,
    roleId: Role;
}


export interface AuthenticatedRequest extends Request, authenticationToken { 
}

export interface authenticationToken {
    userData: jwtUserData
}


