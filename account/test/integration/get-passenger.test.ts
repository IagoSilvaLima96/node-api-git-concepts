import CreatePassenger from "../../src/application/usecase/create-passenger";
import GetPassenger from "../../src/application/usecase/get-passenger";
import { PassengerDatabaseRepository } from "../../src/infra/repository/passenger-database.repository";
import { PassengerRepository } from "../../src/application/repositoy/passenger.repository";
import { PGPromiseAdapter } from "../../src/infra/database/pg-promise.adapter";
import { UserDatabaseRepository } from "../../src/infra/repository/user-database.repository";

test("Deve cadastrar e obter o passageiro", async () => {
  const input = {
    name: "Iago Silva",
    email: "iagocrouchlima@gmail.com",
    document: "69309539038",
    password: "123456",
  };
  const connection = new PGPromiseAdapter();
  const passengerRepository: PassengerRepository =
    new PassengerDatabaseRepository(connection);
  const userRepository = new UserDatabaseRepository(connection);
  const createUsecase = new CreatePassenger(
    passengerRepository,
    userRepository
  );
  const getUsecase = new GetPassenger(passengerRepository, userRepository);
  const { passengerId } = await createUsecase.execute(input);
  const passenger = await getUsecase.execute(passengerId);
  expect(passenger.name).toBe(input.name);
  expect(passenger.email).toBe(input.email);
  expect(passenger.document).toBe(input.document);
  await connection.close();
});
