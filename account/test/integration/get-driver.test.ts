import CreateDriver from "../../src/application/usecase/create-driver";
import GetDriver from "../../src/application/usecase/get-driver";
import { DriverDatabaseRepository } from "../../src/infra/repository/driver-database.repository";
import { DriverRepository } from "../../src/application/repositoy/driver.repository";
import { PGPromiseAdapter } from "../../src/infra/database/pg-promise.adapter";

test("Deve cadastrar e obter o motorista", async () => {
  const input = {
    name: "Taynah Lima",
    email: "taynahlima97@gmail.com",
    document: "85464428003",
    carPlate: "ABC1234",
  };
  const connection = new PGPromiseAdapter();
  const driverRepository: DriverRepository = new DriverDatabaseRepository(
    connection
  );
  const createUsecase = new CreateDriver(driverRepository);
  const { driverId } = await createUsecase.execute(input);
  const getUsecase = new GetDriver(driverRepository);
  const driver = await getUsecase.execute(driverId);
  expect(driver.name).toBe(input.name);
  expect(driver.email).toBe(input.email);
  expect(driver.document).toBe(input.document);
  expect(driver.carPlate).toBe(input.carPlate);
  await connection.close();
});
