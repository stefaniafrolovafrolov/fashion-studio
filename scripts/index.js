import { formValidator } from "./formValidator.js";
import { validationConfig } from "../utils/validationConfig.js";
import { validationCommentsConfig } from "../utils/validationCommentsConfig.js";
import {
  formContactRegProcedures,
  formComments,
  buttonSubmitContactForm,
  buttonSubmitComments,
} from "../utils/constants.js";



const formContactProceduresValidator = new formValidator(
  validationConfig,
  formContactRegProcedures
);

const formCommentsValidator = new formValidator(
  validationCommentsConfig,
  formComments
);

formContactProceduresValidator.enableValidation();

formCommentsValidator.enableValidation();
