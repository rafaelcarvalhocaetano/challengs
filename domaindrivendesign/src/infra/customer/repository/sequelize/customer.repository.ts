import { Customer } from "../../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../../domain/customer/repository/customer-repository";
import { Address } from "../../../../domain/customer/value-object/address.vo";
import { CustomerModel } from "./customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });
    } catch (error) {
      throw new Error("Customer not found");
    }
    const customer = new Customer(id, customerModel.name);
    const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModelAll = await CustomerModel.findAll();
    const customers = customerModelAll.map((ctmModel) => {
      let customer = new Customer(ctmModel.id, ctmModel.name);
      customer.addRewardPoints(ctmModel.rewardPoints);
      const address = new Address(ctmModel.street, ctmModel.number, ctmModel.zipcode, ctmModel.city);
      customer.changeAddress(address);
      if (ctmModel.active) {
        customer.activate();
      }
      return customer;
    });
    return customers;
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: { id: entity.id },
      }
    );
  }
}
