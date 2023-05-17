import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import { ProductInterface } from "./product.interface";

export class Product extends Entity implements ProductInterface {
  // private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  // get id(): string {
  //   return this._id;
  // }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(nv: number): void {
    this._price = nv;
  }

  private validate() {
    // if (!this._id) {
    //   // throw new Error("Id is required");
    //   this.notification.addError({
    //     context: "product",
    //     message: "Id is required",
    //   });
    // }
    // if (!this._name) {
    //   // throw new Error("Name is required");
    //   this.notification.addError({
    //     context: "product",
    //     message: "Name is required",
    //   });
    // }
    // if (this._price < 0) {
    //   // throw new Error("Price must be greater than zero");
    //   this.notification.addError({
    //     context: "product",
    //     message: "Price must be greater than zero",
    //   });
    // }
    ProductValidatorFactory.create().validate(this);
  }
}
