import CreatePassenger from "../../src/application/usecase/create-passenger";
import { PassengerRepository } from "../../src/application/repositoy/passenger.repository";
import { Passenger } from "../../src/domain/passenger/passenger";
import { PGPromiseAdapter } from "../../src/infra/database/pg-promise.adapter";
import { UserDatabaseRepository } from "../../src/infra/repository/user-database.repository";

//narrow integration test
test("Deve cadastrar passageiro", async () => {
  const input = {
    name: "Iago Silva",
    email: "iagocrouchlima@gmail.com",
    document: "69309539038",
  };
  const passengerRepository: PassengerRepository = {
    get: async function (passengerId: string): Promise<any> {
      return Passenger.create(input.name, input.email, input.document);
    },
    create: async function (data: any): Promise<void> {
      return undefined;
    },
  };
  const connection = new PGPromiseAdapter();
  const usecase = new CreatePassenger(
    passengerRepository,
    new UserDatabaseRepository(connection)
  );
  const output = await usecase.execute(input);
  expect(output.passengerId).toBeDefined();
});
