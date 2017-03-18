import { Product } from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "p1", 120);

const MockRepsitory = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product USECASE", () => {
  it("should find a product", async () => {
    const productRepository = MockRepsitory();
    const useCase = new FindProductUseCase(productRepository);
    const output = await useCase.execute(product);
    expect(output.id).toEqual("1");
    expect(output.name).toEqual("p1");
    expect(output.price).toEqual(120);
  });
});
