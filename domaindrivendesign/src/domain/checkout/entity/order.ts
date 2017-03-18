import OrderItem from "./orderItem";

export default class Order {
  private _id: string;
  private _customerid: string;
  private _items: OrderItem[];
  private _total: number = 0;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerid = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  private validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerid.length === 0) {
      throw new Error("customerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than 0");
    }
    return true;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerid;
  }

  get items(): OrderItem[] {
    return this._items;
  }
}
