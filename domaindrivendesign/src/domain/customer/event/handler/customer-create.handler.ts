import { EventHandlerInterface } from "../../../@shared/event/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class CustomerCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    // pra tudo
    console.log(`Esse é o ${event.eventData.order} console.log do evento: CustomerCreated`);
  }
}
