import { UsecaseFactory } from "../../application/factory/usecase.factory";
import CalculateRide from "../../application/usecase/calculate-ride";
import { inject } from "../di/inject";
import { HttpServer } from "./http-server";

export class MainController {
  @inject("calculateRide")
  private calculateRide?: CalculateRide;

  constructor(
    private readonly server: HttpServer,
    private readonly usecaseFactory: UsecaseFactory
  ) {
    this.server.on(
      "post",
      "/calculate_ride",
      async (params: any, body: any) => {
        // return this.usecaseFactory.createCalculateRide().execute(body);
        return this.calculateRide?.execute(body);
      }
    );

    this.server.on("post", "/request_ride", async (params: any, body: any) => {
      return this.usecaseFactory.createRequestRide().execute(body);
    });
  }
}
