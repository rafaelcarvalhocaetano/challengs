import { app, sequelize } from "../expresso";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "a",
      price: 123,
    });

    expect(response.statusCode).toBe(200);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "A",
    });
    expect(response.statusCode).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app).post("/product").send({
      name: "a",
      price: 100,
    });
    expect(response.statusCode).toBe(200);
    const response2 = await request(app).post("/product").send({
      name: "b",
      price: 200,
    });
    expect(response2.statusCode).toBe(200);
    const listResponse = await request(app).get("/product");
    expect(listResponse.statusCode).toEqual(200);
    expect(listResponse.body.products).toHaveLength(2);

    const product = listResponse.body.products[1];
    expect(product.name).toEqual("b");
    expect(product.price).toBe(200);
  });
});
