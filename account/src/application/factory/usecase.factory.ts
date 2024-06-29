import { DriverRepository } from "../repositoy/driver.repository";
import { PassengerRepository } from "../repositoy/passenger.repository";
import { UserRepository } from "../repositoy/user.repository";
import CreateDriver from "../usecase/create-driver";
import CreatePassenger from "../usecase/create-passenger";
import GetDriver from "../usecase/get-driver";
import GetPassenger from "../usecase/get-passenger";
import { RepositoryFactory } from "./repository.factory";

export class UsecaseFactory {
  private driverRepository: DriverRepository;
  private passengerRepository: PassengerRepository;
  private userRepository: UserRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.driverRepository = repositoryFactory.createDriverRepository();
    this.passengerRepository = repositoryFactory.createPassengerRepository();
    this.userRepository = repositoryFactory.createUserRepository();
  }

  createCreateDriver(): CreateDriver {
    return new CreateDriver(this.driverRepository);
  }

  createCreatePassenger(): CreatePassenger {
    return new CreatePassenger(this.passengerRepository, this.userRepository);
  }

  createGetDriver(): GetDriver {
    return new GetDriver(this.driverRepository);
  }

  createGetPassenger(): GetPassenger {
    return new GetPassenger(this.passengerRepository, this.userRepository);
  }
}
