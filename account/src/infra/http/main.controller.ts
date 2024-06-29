import { UsecaseFactory } from "../../application/factory/usecase.factory";
import { inject } from "../di/inject";
import { HttpServer } from "./http-server";

export class MainController {
  constructor(
    private readonly server: HttpServer,
    private readonly usecaseFactory: UsecaseFactory
  ) {
    this.server.on("post", "/drivers", async (params: any, body: any) => {
      return this.usecaseFactory.createCreateDriver().execute({
        name: body.name,
        email: body.email,
        document: body.document,
        carPlate: body.carPlate,
      });
    });

    this.server.on("get", "/drivers/:id", async (params: any, body: any) => {
      return this.usecaseFactory.createGetDriver().execute(params.id);
    });

    this.server.on("get", "/passengers/:id", async (params: any, body: any) => {
      return this.usecaseFactory.createGetPassenger().execute(params.id);
    });

    this.server.on("post", "/passengers", async (params: any, body: any) => {
      return this.usecaseFactory.createCreatePassenger().execute({
        name: body.name,
        email: body.email,
        document: body.document,
      });
    });
  }
}
