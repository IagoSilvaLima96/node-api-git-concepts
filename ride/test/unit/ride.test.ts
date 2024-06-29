import { Coord } from "../../src/domain/distance/coord";
import Ride from "../../src/domain/ride/ride";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", function () {
  const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-01T10:00:00")
  );
  ride.addPosition(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2021-03-01T10:00:00")
  );
  expect(ride.calculate()).toBe(22);
});

test("Deve fazer o cálculo do preço de uma corrida durante a noite", function () {
  const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-01T23:00:00")
  );
  ride.addPosition(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2021-03-01T23:00:00")
  );
  expect(ride.calculate()).toBe(49);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de dia", function () {
  const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-07T10:00:00")
  );
  ride.addPosition(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2021-03-07T10:00:00")
  );
  expect(ride.calculate()).toBe(27);
});

test("Deve fazer o cálculo do preço de uma corrida no domingo de noite", function () {
  const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-07T23:00:00")
  );
  ride.addPosition(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2021-03-07T23:00:00")
  );
  expect(ride.calculate()).toBe(55);
});

test("Deve lançar um erro se a data for inválida", function () {
  const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("javascript")
  );
  ride.addPosition(
    -27.496887588317275,
    -48.522234807851476,
    new Date("javascript")
  );
  expect(() => ride.calculate()).toThrow(new Error("Invalid date"));
});

test("Deve fazer o cálculo do preço de uma corrida durante o dia com preço mínimo", function () {
  const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
  ride.addPosition(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-07T23:00:00")
  );
  ride.addPosition(
    -27.579020277800876,
    -48.50838017206791,
    new Date("2021-03-07T23:00:00")
  );
  expect(ride.calculate()).toBe(10);
});

test("Deve solicitar uma corrida", () => {
  const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
  expect(ride.status.value).toBe("requested");
});

test("Deve aceitar uma corrida", () => {
  const driverId = "uuid";
  const acceptDate = new Date("2023-03-01T10:05:00");
  const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
  ride.accept(driverId, acceptDate);
  expect(ride.status.value).toBe("accepted");
  expect(ride.driverId).toBe(driverId);
  expect(ride.acceptDate).toEqual(acceptDate);
});

test("Deve iniciar uma corrida", () => {
  const driverId = "uuid";
  const startDate = new Date("2023-03-01T10:15:00");
  const acceptDate = new Date("2023-03-01T10:05:00");
  const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
  ride.accept(driverId, acceptDate);
  ride.start(startDate);
  expect(ride.status.value).toBe("in_progress");
  expect(ride.startDate).toEqual(startDate);
});

test("Deve finalizar uma corrida", () => {
  const driverId = "uuid";
  const startDate = new Date("2023-03-01T10:15:00");
  const acceptDate = new Date("2023-03-01T10:05:00");
  const endDate = new Date("2023-03-01T10:45:00");
  const ride = Ride.create("", new Coord(0, 0), new Coord(0, 0));
  ride.accept(driverId, acceptDate);
  ride.start(startDate);
  ride.end(endDate);
  expect(ride.status.value).toBe("completed");
  expect(ride.endDate).toEqual(endDate);
});
