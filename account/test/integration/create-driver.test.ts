import CreateDriver from "../../src/application/usecase/create-driver";
import { PGPromiseAdapter } from "../../src/infra/database/pg-promise.adapter";
import { DriverDatabaseRepository } from "../../src/infra/repository/driver-database.repository";

//broad
test("Deve cadastrar motorista", async () => {
  const input = {
    name: "Taynah Lima",
    email: "taynahlima97@gmail.com",
    document: "85464428003",
    carPlate: "ABC1234",
  };
  const connection = new PGPromiseAdapter();
  const usecase = new CreateDriver(new DriverDatabaseRepository(connection));
  const output = await usecase.execute(input);
  expect(output.driverId).toBeDefined();
  await connection.close();
});
