import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quatity: number;
    price: number;
  }[];
}

export class OrderFactory {
  static create(ord: OrderFactoryProps): Order {
    const items = ord.items.map((item) => new OrderItem(item.id, item.name, item.price, item.productId, item.quatity));
    return new Order(ord.id, ord.customerId, items);
  }
}
