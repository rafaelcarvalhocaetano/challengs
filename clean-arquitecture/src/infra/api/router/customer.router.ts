import express, { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../../usercase/customer/create/create.customer.usecase";
import { ListCustomerUseCase } from "../../../usercase/customer/list/list.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, resp: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    resp.send(output);
  } catch (error) {
    resp.status(500).send(error);
  }
});

customerRoute.get("/", async (req: Request, resp: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  const output = await usecase.execute({});
  resp.format({
    json: () => resp.send(output),
    xml: async () => resp.send(CustomerPresenter.listXML(output)),
  });
});
