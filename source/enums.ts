export enum Status {
    Active = 1,
    NotActive = 2
}


export enum Role {
    user = 1,
    admin = 2


}
export enum AppError {
    General = "General",
    ConnectionError = "ConnectionError",
    QueryError = "QueryError",
    NoData = "NoData",
    NonNumericInput = "NonNumeric",
    InputParameterNotSupplied = "NoParameter",
    DeletionConflict = "DeletionConflict"
}
