import { Address } from "../value-object/address.vo";
import { CustomerFactory } from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Rafael");
    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual("Rafael");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street 1", 1, "zip-123", "City 1");
    const customer = CustomerFactory.createWithAddress("Rafael1", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual("Rafael1");
    expect(customer.address).toBeDefined();
    expect(customer.address.number).toEqual(1);
    expect(customer.address.city).toEqual("City 1");
  });
});
