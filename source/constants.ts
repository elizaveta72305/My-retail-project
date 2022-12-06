export class Queries {
  public static query: string = "SELECT * FROM stores";
  public static shopid: string = "SELECT * FROM stores WHERE id_store = ";
  public static shopidupdate: string =
    "UPDATE stores SET stores = ? WHERE id_store = ";

  public static createshop: string = "INSERT stores (stores) VALUES (?)";
  public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id;";
  public static deleteshopid: string = "DELETE FROM stores WHERE id_store = ?";
  public static workersShopId: string =
    "SELECT * FROM [employees] WHERE store_id = ?";

  public static employeById: string =
    "SELECT * FROM [employees] WHERE id_employees = ";
  public static workerupdate: string =
    "UPDATE employees SET name_of_employee = ?, position = ? WHERE id_employees = ";
  public static createworker: string =
    "INSERT employees (name_of_employee, position, store_id) VALUES (?, ?, ?)";

  public static showProdByIdShop: string =
    "SELECT * FROM [product] WHERE store_id = ?";
  public static createProduct: string =
    "EXEC [sp_product_new_one] @name = ?, @store_id = ?, @category_product_id = ?";

  public static getUserByLogin: string =
    "SELECT id_user, password, role_id FROM [user] WHERE login = ?";

  public static updateUserById: string =
    "UPDATE [user] SET first_name = ?, last_name = ?, update_date = ?, update_user_id = ?, status_id = ? WHERE id_user = ?";
  public static deleteuserById: string =
    "UPDATE [user] SET update_date = ?, update_user_id = ?, status_id = ? WHERE id_user = ?";
}

export const TEMP_USER_ID: number = 1;

export const NON_EXISTENT_ID: number = -1;

export const DB_CONNECTION_STRING: string =
  "server=.;Database=retail;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

export const TOKEN_SECRET: string = "274e91e2-c00c-47f8-93de-a37d87789784";
