import { formValidator } from "./formValidator.js";
import { validationConfig } from "../utils/validationConfig.js";
import {
  formAppointmentRequest,
  buttonSubmitContactForm,
} from "../utils/constants-form-cotacts.js";

export const formContactProceduresValidator = new formValidator(
  validationConfig,
  formAppointmentRequest
);

formContactProceduresValidator.enableValidation();
