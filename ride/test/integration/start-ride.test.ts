import { AcceptRide } from "../../src/application/usecase/accept-ride";
import { GetRide } from "../../src/application/usecase/get-ride";
import RequestRide from "../../src/application/usecase/request-ride";
import { StartRide } from "../../src/application/usecase/start-ride";
import { PGPromiseAdapter } from "../../src/infra/database/pg-promise.adapter";
import { RepositoryDatabaseFactory } from "../../src/infra/factory/repository-database.factory";
import { AccountHttpGateway } from "../../src/infra/gateway/account-http.gateway";
import { AxiosAdapter } from "../../src/infra/http/axios.adapter";
import { RideDatabaseRepository } from "../../src/infra/repository/ride-database.repository";

test("Deve iniciar uma corrida", async function () {
  const inputCreatePassenger = {
    name: "Iago Silva",
    email: "iagocrouchlima@gmail.com",
    document: "69309539038",
  };

  const connection = new PGPromiseAdapter();
  const httpClient = new AxiosAdapter();
  const accountGateway = new AccountHttpGateway(httpClient);
  const outputCreatePassenger = await accountGateway.createPassenger(
    inputCreatePassenger
  );
  const inputRequestRide = {
    passengerId: outputCreatePassenger.passengerId,
    from: {
      lat: -27.584905257808835,
      lng: -48.545022195325124,
    },
    to: {
      lat: -27.496887588317275,
      lng: -48.522234807851476,
    },
    date: new Date("2023-03-01T10:00:00"),
  };
  const rideDatabaseRepository = new RideDatabaseRepository(connection);
  const requestRide = new RequestRide(rideDatabaseRepository);
  const outputRequestRide = await requestRide.execute(inputRequestRide);
  const inputCreateDriver = {
    name: "Taynah Lima",
    email: "taynahlima97@gmail.com",
    document: "85464428003",
    carPlate: "ABC1234",
  };
  const outputCreateDriver = await accountGateway.createDriver(
    inputCreateDriver
  );
  const acceptRide = new AcceptRide(rideDatabaseRepository);
  const inputAcceptRide = {
    rideId: outputRequestRide.rideId,
    driverId: outputCreateDriver.driverId,
    date: new Date("2023-03-01T10:05:00"),
  };
  await acceptRide.execute(inputAcceptRide);
  const startRide = new StartRide(rideDatabaseRepository);
  const inputStartRide = {
    rideId: outputRequestRide.rideId,
    date: new Date("2023-03-01T10:10:00"),
  };
  await startRide.execute(inputStartRide);
  const repositoryFactory = new RepositoryDatabaseFactory(connection);
  const getRide = new GetRide(repositoryFactory, accountGateway);
  const outputGetRide = await getRide.execute({
    rideId: outputRequestRide.rideId,
  });
  expect(outputGetRide.status).toBe("in_progress");
  expect(outputGetRide.startDate).toEqual(inputStartRide.date);
});
