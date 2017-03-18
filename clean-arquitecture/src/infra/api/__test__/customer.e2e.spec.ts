import { app, sequelize } from "../expresso";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "A",
        address: {
          street: "s",
          city: "c",
          number: 1,
          zip: "12345",
        },
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("A");
    expect(response.body.address.city).toBe("c");
    expect(response.body.address.number).toBe(1);
    expect(response.body.address.zip).toBe("12345");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "A",
    });

    expect(response.statusCode).toBe(500);
  });

  it("should list all customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "A",
        address: {
          street: "s",
          city: "c",
          number: 1,
          zip: "12345",
        },
      });
    expect(response.statusCode).toBe(200);
    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "b",
        address: {
          street: "s2",
          city: "c2",
          number: 1,
          zip: "zip2",
        },
      });
    expect(response2.statusCode).toBe(200);
    const listResponse = await request(app).get("/customer");
    expect(listResponse.statusCode).toEqual(200);
    expect(listResponse.body.customers).toHaveLength(2);

    const c = listResponse.body.customers[1];
    expect(c.name).toEqual("b");
    expect(c.address.city).toBe("c2");

    const listResponseXML = await request(app).get("/customer").set("Accept", "application/xml").send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<customers>`);
    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>A</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<street>s</street>`);
    expect(listResponseXML.text).toContain(`<city>c</city>`);
    expect(listResponseXML.text).toContain(`<number>1</number>`);
    expect(listResponseXML.text).toContain(`<zip>12345</zip>`);
  });
});
