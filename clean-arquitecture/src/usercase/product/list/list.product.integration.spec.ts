import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

const product = new Product("1", "p1", 120);
const product2 = new Product("2", "p2", 220);

describe("Unity test list product", () => {
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

  it("should list products", async () => {
    const productRepository = new ProductRepository();

    await productRepository.create(product);
    await productRepository.create(product2);

    const useCase = new ListProductUseCase(productRepository);
    const output = await useCase.execute();
    expect(output.products).toHaveLength(2);
    expect(output.products[1]).toEqual({ id: "2", name: "p2", price: 220 });
  });
});
