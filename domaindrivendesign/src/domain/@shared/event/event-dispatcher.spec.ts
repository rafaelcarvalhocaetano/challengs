import { Customer } from "../../customer/entity/customer";
import { CustomerChangedAddressEvent } from "../../customer/event/customer-changed-address.event";
import { CustomerCreatedEvent } from "../../customer/event/customer-created.event";
import { CustomerChangedAddressHandler } from "../../customer/event/handler/customer-changed-address.handler";
import { CustomerCreatedHandler } from "../../customer/event/handler/customer-create.handler";
import { Address } from "../../customer/value-object/address.vo";
import { SendEmailWhenProductIsCreatedhandler } from "../../product/event/handler/send-email-when-product-is-create.handler";
import { ProductCreatedEvent } from "../../product/event/product-created.event";

import { EventDispatcher } from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedhandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedhandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(0);
  });

  it("should unregister all event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedhandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notfy all event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedhandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      desription: "Product 1 description",
      price: 10.0,
    });

    // quando o notify for executado o senmailerWhenProcutsIsCreatedHandler.handler9) deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should customer create notify event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandlerCustomerCreated = new CustomerCreatedHandler();

    const spyEventHandler = jest.spyOn(eventHandlerCustomerCreated, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerCreated);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerCustomerCreated);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Customer 1",
      order: "primeiro",
    });

    const customerCreatedEvent2 = new CustomerCreatedEvent({
      id: "1",
      name: "Customer 1",
      order: "segundo",
    });

    eventDispatcher.notify(customerCreatedEvent);
    eventDispatcher.notify(customerCreatedEvent2);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should customer change address event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandlerCustomerChangedAddress = new CustomerChangedAddressHandler();

    const spyEventHandler = jest.spyOn(eventHandlerCustomerChangedAddress, "handle");

    const customer = new Customer("1", "Rafael");
    const address = new Address("Street 1", 1, "08888-990", "City 1");

    customer.changeAddress(address);

    if (customer.address) {
      eventDispatcher.register("CustomerChangedAddressEvent", eventHandlerCustomerChangedAddress);
      expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandlerCustomerChangedAddress);
    }

    const customerCreatedEvent = new CustomerChangedAddressEvent({
      id: customer.id,
      name: customer.name,
      address,
    });

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
