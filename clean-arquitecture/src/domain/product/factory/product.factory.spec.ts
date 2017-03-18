import { ProductFactoryory } from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a product type a", () => {
    const product = ProductFactoryory.create("a", "Product a", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toEqual("Product a");
    expect(product.price).toEqual(1);
    expect(product.constructor.name).toEqual("Product");
  });

  it("should create a product type b", () => {
    const product = ProductFactoryory.create("b", "Product b", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toEqual("Product b");
    expect(product.price).toEqual(2);
    expect(product.constructor.name).toEqual("ProductB");
  });

  it("should throw an error when product type is not supported", () => {
    expect(() => ProductFactoryory.create("c", "Product C", 1)).toThrowError("Product type not supported");
  });
});
