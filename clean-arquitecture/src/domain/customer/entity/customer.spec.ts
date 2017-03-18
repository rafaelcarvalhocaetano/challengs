import { Address } from "../value-object/address.vo";
import { Customer } from "./customer";

describe("Customer unit test", () => {
  it("should name is required", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrowError("customer: Name is required");
  });
  it("should id is required", () => {
    expect(() => {
      new Customer("", "Rafael");
    }).toThrowError("customer: Id is required");
  });

  it("should change name", () => {
    const ctm = new Customer("123", "John");
    ctm.changeName("Jane");
    expect(ctm.name).toBe("Jane");
  });

  it("should activete customer", () => {
    const ctm = new Customer("123", "Customer 1");
    const address = new Address("street 1", 123, "123333-22", "SP");
    ctm.Address = address;
    ctm.activate();

    expect(ctm.isActive()).toBe(true);
  });

  it("should deactivete customer", () => {
    const ctm = new Customer("123", "Customer 1");
    expect(ctm.isActive()).toBe(false);
  });

  it("should throw error when address is undefined", () => {
    expect(() => {
      const ctm = new Customer("1", "Customer 1");
      ctm.activate();
    }).toThrowError("customer: Address is mandatory to activate a customer");
  });

  it("should add reward points", () => {
    const ctm = new Customer("1", "Customer 1");

    expect(ctm.rewardPoints).toBe(0);
    ctm.addRewardPoints(10);
    expect(ctm.rewardPoints).toBe(10);

    ctm.addRewardPoints(10);
    expect(ctm.rewardPoints).toBe(20);
  });
});
