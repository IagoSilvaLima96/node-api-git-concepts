export interface AccountGateway {
  createDriver(driver: CreateDriverInput): Promise<CreateDriverOutput>;
  createPassenger(
    passenger: CreatePassengerInput
  ): Promise<CreatePassengerOutput>;
  getDriver(driverId: string): Promise<Driver>;
  getPassenger(passengerId: string): Promise<Passenger>;
}

export type Driver = {
  driverId: string;
  name: string;
  email: string;
  document: string;
  carPlate: string;
};

export type Passenger = {
  passengerId: string;
  name: string;
  email: string;
  document: string;
};

export type CreateDriverInput = {
  name: string;
  document: string;
  email: string;
  carPlate: string;
};

export type CreateDriverOutput = {
  driverId: string;
};

export type CreatePassengerInput = {
  name: string;
  document: string;
  email: string;
};

export type CreatePassengerOutput = {
  passengerId: string;
};
