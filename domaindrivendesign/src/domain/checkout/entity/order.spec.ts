import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => new Order("123", "", [])).toThrowError("customerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => new Order("123", "123", [])).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const orderItem = new OrderItem("i1", "item 1", 100, "p1", 2);
    const order = new Order("123", "123", [orderItem]);

    let total = order.total();

    expect(total).toEqual(200);

    const orderItem2 = new OrderItem("i1", "item 1", 200, "p2", 2);
    const order2 = new Order("123", "123", [orderItem, orderItem2]);
    total = order2.total();
    expect(total).toEqual(600);
  });

  it("should throw error if the item qtd is less or equal 0", () => {
    expect(() => {
      const orderItem = new OrderItem("i1", "item 1", 100, "p1", 0);
      const order = new Order("123", "123", [orderItem]);
    }).toThrowError("Quantity must be greater than 0");
  });
});
