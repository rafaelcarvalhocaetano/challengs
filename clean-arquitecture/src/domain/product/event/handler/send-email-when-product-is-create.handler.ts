import { EventHandlerInterface } from "../../../@shared/event/event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreatedhandler implements EventHandlerInterface<ProductCreatedEvent> {
  // poderia bater na base de dados ou chamar o mailer para disparo de emails
  handle(event: ProductCreatedEvent): void {
    console.log(`enviando email ....`);
  }
}
