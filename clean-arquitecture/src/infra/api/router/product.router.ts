import express, { Request, Response } from "express";
import { ProductFactoryory } from "../../../domain/product/factory/product.factory";
import { CreateProductUseCase } from "../../../usercase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usercase/product/list/list.product.usecase";
import { ProductRepository } from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, resp: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const product = ProductFactoryory.create("a", req.body.name, req.body.price);
    const output = await usecase.execute(product);
    resp.send(output);
  } catch (error) {
    resp.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, resp: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  try {
    const output = await usecase.execute();
    resp.send(output);
  } catch (error) {
    resp.status(500).send(error);
  }
});
