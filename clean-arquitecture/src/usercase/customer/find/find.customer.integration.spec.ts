import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address.vo";
import { CustomerModel } from "../../../infra/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infra/customer/repository/sequelize/customer.repository";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Test find use case", () => {
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

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const inputCustomer = new Customer("1", "Rafael");
    const inputAddress = new Address("A", 1, "cep", "cidade");
    inputCustomer.changeAddress(inputAddress);
    await customerRepository.create(inputCustomer);

    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "Rafael",
      address: {
        street: "A",
        city: "cidade",
        number: 1,
        zip: "cep",
      },
    };
    const result = await useCase.execute(input);
    expect(result).toEqual(output);
  });
});
