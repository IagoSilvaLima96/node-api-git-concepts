import RequestRide from "../../src/application/usecase/request-ride";
import { PGPromiseAdapter } from "../../src/infra/database/pg-promise.adapter";
import { AccountHttpGateway } from "../../src/infra/gateway/account-http.gateway";
import { AxiosAdapter } from "../../src/infra/http/axios.adapter";
import { RideDatabaseRepository } from "../../src/infra/repository/ride-database.repository";

test("Deve solicitar uma corrida", async function () {
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
  expect(outputRequestRide.rideId).toBeDefined();
});
