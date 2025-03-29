import { formValidator } from "./formValidator.js";
import { validationConfig } from "../utils/validationConfig.js";
import { validationCommentsConfig } from "../utils/validationCommentsConfig.js";
import {
  formContactRegProcedures,
  formComments,
  buttonSubmitContactForm,
  buttonSubmitComments,
} from "../utils/constants.js";

console.log('index.js подключен успешно');

const formContactProceduresValidator = new formValidator(
  validationConfig,
  formContactRegProcedures
);

console.log(formContactProceduresValidator)

const formCommentsValidator = new formValidator(
  validationCommentsConfig,
  formComments
);

formContactProceduresValidator.enableValidation();

formCommentsValidator.enableValidation();
