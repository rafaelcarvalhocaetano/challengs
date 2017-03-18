import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address.vo";
import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  id: "1",
  name: "Rafael",
  address: {
    street: "rua",
    city: "cidade",
    number: 1,
    zip: "cep",
  },
};

const customer = new Customer("1", "Rafael");
const inputAddress = new Address("rua", 1, "cep", "cidade");
customer.changeAddress(inputAddress);

const MockRepsitory = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test create customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepsitory();
    const useCase = new CreateCustomerUseCase(customerRepository);
    const output = await useCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    });
  });

  it("should thrown an error when name is missing", () => {
    const customerRepository = MockRepsitory();

    input.name = "";
    const useCase = new CreateCustomerUseCase(customerRepository);

    expect(async () => await useCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should thrown an error when street is missing", () => {
    const customerRepository = MockRepsitory();

    input.address.street = "";
    const useCase = new CreateCustomerUseCase(customerRepository);

    expect(async () => await useCase.execute(input)).rejects.toThrow("_street is required");
  });
});
