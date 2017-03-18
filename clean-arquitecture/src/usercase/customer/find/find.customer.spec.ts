import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address.vo";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new Customer("1", "Rafael");
const inputAddress = new Address("rua", 1, "cep", "cidade");
customer.changeAddress(inputAddress);

const MockRepsitory = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepsitory();
    const useCase = new FindCustomerUseCase(customerRepository);
    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "Rafael",
      address: {
        street: "rua",
        city: "cidade",
        number: 1,
        zip: "cep",
      },
    };
    const result = await useCase.execute(input);
    expect(result).toEqual(output);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepsitory();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const input = {
      id: "2",
    };

    expect(() => new FindCustomerUseCase(customerRepository).execute(input)).rejects.toThrow("Customer not found");
  });
});
