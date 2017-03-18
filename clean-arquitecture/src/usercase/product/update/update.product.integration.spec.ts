import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("1", "p1", 120);

describe("Unit Test update product USECASE", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const productUpdate = new Product(product.id, product.name, product.price);
    productUpdate.changeName("Atualização");
    productUpdate.changePrice(200);

    const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    const output = await productUpdateUseCase.execute(productUpdate);

    expect(output.id).toEqual("1");
    expect(output.name).toEqual("Atualização");
    expect(output.price).toEqual(200);
  });
});
