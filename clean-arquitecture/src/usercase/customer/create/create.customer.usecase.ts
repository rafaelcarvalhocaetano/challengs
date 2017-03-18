import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";

import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository";
import { Address } from "../../../domain/customer/value-object/address.vo";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zip: customer.address.zip,
      },
    };
  }
}
