import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import { Address } from "../value-object/address.vo";

export class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
  get address(): Address {
    return this._address;
  }

  validate() {
    // if (!this.id.length) {
    //   // throw new Error("Id is required");
    //   this.notification.addError({
    //     context: "customer",
    //     message: "Id is required",
    //   });
    // }
    // if (!this._name.length) {
    //   // throw new Error("Name is required");
    //   this.notification.addError({
    //     context: "customer",
    //     message: "Name is required",
    //   });
    // }
    CustomerValidatorFactory.create().validate(this);
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  changeAddress(a: Address) {
    this._address = a;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate(): void {
    if (this._address === undefined) {
      this.notification.addError({
        context: "customer",
        message: "Address is mandatory to activate a customer",
      });
      if (this.notification.hasErrors()) {
        throw new NotificationError(this.notification.errors);
      }
      // throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  set Address(address: Address) {
    this._address = address;
  }

  deactivated() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }
}
