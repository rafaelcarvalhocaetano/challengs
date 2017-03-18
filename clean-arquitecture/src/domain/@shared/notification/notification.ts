export type NotificationErrorProps = {
  message: string;
  context: string;
};

export default class Notification {
  public _errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this._errors.push(error);
  }

  get errors(): NotificationErrorProps[] {
    return this._errors;
  }

  messages(context?: string): string {
    let message = "";
    this._errors.forEach((e) => {
      if (context === undefined || e.context === context) {
        message += `${e.context}: ${e.message},`;
      }
    });
    return message;
  }

  hasErrors(): boolean {
    return !!this._errors.length;
  }
}
