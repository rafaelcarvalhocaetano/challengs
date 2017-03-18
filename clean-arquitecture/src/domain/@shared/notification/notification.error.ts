import { NotificationErrorProps } from "./notification";

export default class NotificationError extends Error {
  constructor(errors: NotificationErrorProps[]) {
    super(errors.map((e) => `${e.context}: ${e.message}`).join(","));
  }
}
