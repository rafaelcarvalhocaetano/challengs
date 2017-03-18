import { Address } from "../value-object/address.vo";

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
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
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
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
      throw new Error("Address is mandatory to activate a customer");
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
