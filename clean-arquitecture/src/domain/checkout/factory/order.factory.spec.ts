import { v4 as uuid } from "uuid";
import { OrderFactory } from "./order.factory";

describe("Order factory unit test", () => {
  it("should create a Order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "P 1",
          productId: uuid(),
          quatity: 1,
          price: 100,
        },
      ],
    };
    const order = OrderFactory.create(orderProps);
    expect(order.id).toBeDefined();
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items).toHaveLength(1);
  });
});
