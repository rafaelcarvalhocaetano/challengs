import { Product } from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("1", "p1", 120);

const MockRepsitory = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit Test update product USECASE", () => {
  it("should update a product", async () => {
    const productRepository = MockRepsitory();
    const useCase = new UpdateProductUseCase(productRepository);
    const output = await useCase.execute(product);
    expect(output.id).toEqual("1");
    expect(output.name).toEqual("p1");
    expect(output.price).toEqual(120);
  });
});
