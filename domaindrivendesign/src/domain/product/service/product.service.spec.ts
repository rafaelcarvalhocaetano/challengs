import { Product } from "../entity/product";
import ProductService from "./product.service";

describe("Product service unity test", () => {
  it("should change the prices of all products", () => {
    const productOne = new Product("123", "P1", 100);
    const productTwo = new Product("321", "P2", 200);
    const products = [productOne, productTwo];

    ProductService.increasePrice(products, 100);

    expect(productOne.price).toEqual(200);
    expect(productTwo.price).toEqual(400);
  });
});
