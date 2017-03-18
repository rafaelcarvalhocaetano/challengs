import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../customer/repository/sequelize/customer.model";
import { ProductModel } from "../product/repository/sequelize/product.model";
import { customerRoute } from "./router/customer.router";
import { productRoute } from "./router/product.router";

export const app: Express = express();

app.use(express.json());

// routers
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setupDB() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDB();
