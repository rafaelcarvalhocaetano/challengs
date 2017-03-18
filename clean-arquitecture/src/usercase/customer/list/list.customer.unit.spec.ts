import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address.vo";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customer = CustomerFactory.createWithAddress("Rafael", new Address("rua", 1, "cep", "cidade"));

const customer2 = CustomerFactory.createWithAddress("Rose", new Address("rua2", 2, "cep2", "cidade2"));

const MockRepsitory = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test list customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepsitory();
    const useCase = new ListCustomerUseCase(customerRepository);
    const output = await useCase.execute({});
    expect(output.customers).toHaveLength(2);
    expect(output.customers[0].id).toEqual(customer.id);
    expect(output.customers[1].id).toEqual(customer2.id);
    expect(output.customers[0].name).toEqual("Rafael");
    expect(output.customers[1].name).toEqual("Rose");
  });
});
