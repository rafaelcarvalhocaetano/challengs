export class Address {
  _street: string = "";
  _number: number = 0;
  _zip: string = "";
  _city: string = "";

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.validate();
  }

  validate() {
    if (!this._street.length) {
      throw new Error("_street is required");
    }
    if (!this._zip.length) {
      throw new Error("_zip is required");
    }
    if (!this._city.length) {
      throw new Error("_city is required");
    }
  }

  toString() {
    return `${this._city}, ${this._number}, ${this._street}, ${this._zip}`;
  }

  get street(): string {
    return this._street;
  }
  get number(): number {
    return this._number;
  }
  get zip(): string {
    return this._zip;
  }
  get city(): string {
    return this._city;
  }
}
