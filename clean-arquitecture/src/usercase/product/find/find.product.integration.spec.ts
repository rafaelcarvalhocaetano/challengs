import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "p1", 120);

describe("Unit Test find product USECASE", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);
    await productRepository.create(product);

    const output = await useCase.execute({ id: "1" });

    expect(output.id).toEqual("1");
    expect(output.name).toEqual("p1");
    expect(output.price).toEqual(120);
  });
});
