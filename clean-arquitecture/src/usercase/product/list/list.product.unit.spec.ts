import { Product } from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product = new Product("1", "p1", 120);
const product2 = new Product("2", "p2", 220);

const MockRepsitory = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unity test list product", () => {
  it("should list products", async () => {
    const productRepository = MockRepsitory();
    const useCase = new ListProductUseCase(productRepository);
    const output = await useCase.execute();
    expect(output.products).toHaveLength(2);
    expect(output.products[1]).toEqual({ id: "2", name: "p2", price: 220 });
  });
});
