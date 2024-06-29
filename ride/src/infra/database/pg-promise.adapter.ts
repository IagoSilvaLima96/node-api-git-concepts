import { DatabaseConnection } from "./database-connection";
import pgp from "pg-promise";

export class PGPromiseAdapter implements DatabaseConnection {
  private connection;

  constructor() {
    const connectionString = "postgres://postgres@localhost:5432/uber";
    this.connection = pgp({})(connectionString);
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }
  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}
