import CreatePassenger from "../../src/application/usecase/create-passenger";
import GetPassenger from "../../src/application/usecase/get-passenger";
import { PassengerDatabaseRepository } from "../../src/infra/repository/passenger-database.repository";
import { PassengerRepository } from "../../src/application/repositoy/passenger.repository";
import { PGPromiseAdapter } from "../../src/infra/database/pg-promise.adapter";
import { UserDatabaseRepository } from "../../src/infra/repository/user-database.repository";
import { Login } from "../../src/application/usecase/login";
import { GetSession } from "../../src/application/usecase/get-session";

test("Deve fazer login", async () => {
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
  await createUsecase.execute(input);
  const login = new Login(userRepository);
  const loginOutput = await login.execute({
    email: input.email,
    password: input.password,
  });
  expect(loginOutput.token).toBeDefined();
  console.log(loginOutput.token);
  await connection.close();
});

test("Deve fazer login e validar sessão", async () => {
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
  await createUsecase.execute(input);
  const login = new Login(userRepository);
  const loginOutput = await login.execute({
    email: input.email,
    password: input.password,
  });
  const usecase = new GetSession();
  const output = usecase.execute({ token: loginOutput.token });
  expect(output.email).toBe(input.email);
  await connection.close();
});
