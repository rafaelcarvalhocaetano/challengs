import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Customer } from "../entity/customer";
import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          { abortEarly: false }
        );
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((err) => {
        entity.notification.addError({
          context: "customer",
          message: err,
        });
      });
    }
  }
}
