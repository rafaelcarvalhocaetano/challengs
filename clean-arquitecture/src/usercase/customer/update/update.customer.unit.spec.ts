import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address.vo";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = new Customer("1", "Rafael");
const inputAddress = new Address("rua", 1, "cep", "cidade");
customer.changeAddress(inputAddress);

const input = {
  id: customer.id,
  name: "Rafael",
  address: {
    street: "rua",
    city: "cidade",
    number: 1,
    zip: "cep",
  },
};

const MockRepsitory = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockReturnValue(Promise.resolve(input)),
  };
};

describe("Update Customer unity test", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepsitory();
    const useCase = new UpdateCustomerUseCase(customerRepository);
    const output = await useCase.execute(input);
    expect(output).toEqual(input);
  });
});
