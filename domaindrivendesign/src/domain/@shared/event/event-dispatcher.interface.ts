import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventname: string, eventhandler: EventHandlerInterface): void;
  unregister(eventname: string, eventhandler: EventHandlerInterface): void;
  unregisterAll(): void;
}
