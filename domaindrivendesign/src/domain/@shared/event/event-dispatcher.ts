import { EventDispatcherInterface } from "./event-dispatcher.interface";
import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export class EventDispatcher implements EventDispatcherInterface {
  //

  //
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  register(eventname: string, eventhandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventname]) {
      this.getEventHandlers[eventname] = [];
    }
    this.getEventHandlers[eventname].push(eventhandler);
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventhandler) => eventhandler.handle(event));
    }
  }

  unregister(eventname: string, eventhandler: EventHandlerInterface<EventInterface>): void {
    if (this.eventHandlers[eventname]) {
      const index = this.eventHandlers[eventname].indexOf(eventhandler);
      if (index !== -1) {
        this.eventHandlers[eventname].splice(index, 1);
      }
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
