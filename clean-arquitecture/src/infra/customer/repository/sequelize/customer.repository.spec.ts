import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../../domain/customer/entity/customer";

import { Address } from "../../../../domain/customer/value-object/address.vo";
import { CustomerModel } from "./customer.model";
import { CustomerRepository } from "./customer.repository";

describe("Customer repository test unity", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Product 1");
    const address = new Address("street 1", 1, "06668-999", "city 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customerModel.name,
      active: customerModel.active,
      rewardPoints: customerModel.rewardPoints,
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zip,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("2", "Product 1");
    const address = new Address("street 1", 1, "06668-999", "city 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "2" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "2",
      name: customerModel.name,
      active: customerModel.active,
      rewardPoints: customerModel.rewardPoints,
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zip,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("3", "Product 1");
    const address = new Address("street 1", 1, "06668-999", "city 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customerResult).toStrictEqual(customerResult);
  });

  it("should throu an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => await customerRepository.find("12")).rejects.toThrow("Customer not found");
  });

  it("should findAll customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("4", "Product 1");
    const address = new Address("street 1", 1, "06668-999", "city 1");
    customer.changeAddress(address);

    const customer2 = new Customer("5", "Product 2");
    const address2 = new Address("street 2", 2, "06668-999", "city 2");
    customer2.changeAddress(address2);

    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer);
    expect(customers).toContainEqual(customer2);
  });
});
