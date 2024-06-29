import { RideRepository } from "../../application/repositoy/ride.repository";
import { Coord } from "../../domain/distance/coord";
import Ride from "../../domain/ride/ride";
import { DatabaseConnection } from "../database/database-connection";

export class RideDatabaseRepository implements RideRepository {
  constructor(readonly connection: DatabaseConnection) {}
  async update(ride: Ride): Promise<void> {
    await this.connection.query(
      "update ride set driver_id = $1, status = $2, accept_date = $3, start_date = $4, end_date = $5 where ride_id = $6",
      [
        ride.driverId,
        ride.status.value,
        ride.acceptDate,
        ride.startDate,
        ride.endDate,
        ride.rideId,
      ]
    );
  }

  async save(ride: Ride): Promise<void> {
    await this.connection.query(
      "insert into ride (ride_id, passenger_id, from_lat, from_long, to_lat, to_long, status, request_date) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        ride.rideId,
        ride.passengerId,
        ride.from.lat,
        ride.from.lng,
        ride.to.lat,
        ride.to.lng,
        ride.status.value,
        ride.requestDate,
      ]
    );
  }
  async get(rideId: string): Promise<Ride> {
    const [rideData] = await this.connection.query(
      "select * from ride where ride_id = $1",
      [rideId]
    );
    const from = new Coord(
      parseFloat(rideData.from_lat),
      parseFloat(rideData.from_long)
    );
    const to = new Coord(
      parseFloat(rideData.to_lat),
      parseFloat(rideData.to_long)
    );
    const ride = new Ride(
      rideData.ride_id,
      rideData.passenger_id,
      from,
      to,
      rideData.status,
      new Date(rideData.request_date)
    );
    ride.driverId = rideData.driver_id;
    ride.acceptDate = rideData.accept_date;
    ride.startDate = rideData.start_date;
    ride.endDate = rideData.end_date;
    return ride;
  }
}
