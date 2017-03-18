import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address.vo";
import { Product } from "../../../../domain/product/entity/product";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { ProductModel } from "../../../product/repository/sequelize/product.model";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";
import { OrderModel } from "./order.model";

import { OrderRepository } from "./order.repository";
import { OrderItemModel } from "./orderItem.model";

describe("Order repository test unity", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Product 1");
    const address = new Address("street 1", 1, "06668-999", "city 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.price, "1", 2);
    const order = new Order("1", "1", [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "1",
          product_id: "1",
        },
      ],
    });
  });

  // it("should update a order", async () => {
  //   // CUSTOMER
  //   const customerRepository = new CustomerRepository();
  //   const customer = new Customer("1", "Product 1");
  //   const address = new Address("street 1", 1, "06668-999", "city 1");
  //   customer.changeAddress(address);
  //   await customerRepository.create(customer);

  //   // PRODUCT
  //   const productRepository = new ProductRepository();
  //   const product = new Product("1", "Product 1", 100);
  //   await productRepository.create(product);

  //   // ORDERS
  //   const orderRepository = new OrderRepository();
  //   const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
  //   const order = new Order("1", customer.id, [orderItem]);
  //   await orderRepository.create(order);

  //   const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: [OrderItemModel] });

  //   expect(orderModel.toJSON()).toStrictEqual({
  //     id: "1",
  //     customer_id: "1",
  //     total: order.total(),
  //     items: [
  //       {
  //         id: orderItem.id,
  //         name: orderItem.name,
  //         price: orderItem.price,
  //         quantity: orderItem.quantity,
  //         order_id: "1",
  //         product_id: "1",
  //       },
  //     ],
  //   });

  //   // PRODUCT
  //   const product2 = new Product("2", "Product 2", 200);
  //   await productRepository.create(product2);

  //   // ORDERS
  //   const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 1);
  //   const order2 = new Order("1", customer.id, [orderItem, orderItem2]);

  //   await orderRepository.update(order2);

  //   const orderModel2 = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

  //   expect(orderModel2.toJSON()).toStrictEqual({
  //     id: "1",
  //     customer_id: "1",
  //     total: 400,
  //     items: [
  //       {
  //         id: orderItem.id,
  //         name: orderItem.name,
  //         price: orderItem.price,
  //         quantity: orderItem.quantity,
  //         order_id: "1",
  //         product_id: product.id,
  //       },
  //       {
  //         id: orderItem2.id,
  //         name: orderItem2.name,
  //         price: orderItem2.price,
  //         quantity: orderItem2.quantity,
  //         order_id: "1",
  //         product_id: product2.id,
  //       },
  //     ],
  //   });
  // });

  // it("should find a order", async () => {
  //   const customerRepository = new CustomerRepository();
  //   const customer = new Customer("1", "Product 1");
  //   const address = new Address("street 1", 1, "06668-999", "city 1");
  //   customer.changeAddress(address);
  //   await customerRepository.create(customer);

  //   const productRepository = new ProductRepository();
  //   const product = new Product("1", "Product 1", 100);
  //   await productRepository.create(product);

  //   const orderRepository = new OrderRepository();
  //   const orderItem = new OrderItem("1", product.name, product.price, product.id, 1);
  //   const order = new Order("1", customer.id, [orderItem]);
  //   await orderRepository.create(order);

  //   const response = await orderRepository.find(order.id);

  //   expect(response).toStrictEqual(order);
  //   expect(response.items).toHaveLength(1);
  //   expect(response.items).toEqual([orderItem]);
  // });

  // it("should findAll order", async () => {
  //   const customerRepository = new CustomerRepository();
  //   const customer = new Customer("1", "Product 1");
  //   const address = new Address("street 1", 1, "06668-999", "city 1");
  //   customer.changeAddress(address);
  //   await customerRepository.create(customer);

  //   const productRepository = new ProductRepository();
  //   const product = new Product("1", "Product 1", 100);
  //   await productRepository.create(product);

  //   const orderRepository = new OrderRepository();
  //   const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
  //   const order = new Order("1", customer.id, [orderItem]);
  //   await orderRepository.create(order);

  //   const orderItem2 = new OrderItem("2", product.name, product.price, product.id, 1);
  //   const order2 = new Order("2", customer.id, [orderItem2]);
  //   await orderRepository.create(order2);

  //   const orders = await orderRepository.findAll();
  //   expect(orders).toHaveLength(2);
  // });
});
