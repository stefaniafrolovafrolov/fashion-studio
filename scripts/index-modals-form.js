import { formValidator } from "./formValidator.js";
import { validationModalConfig } from "../utils/validationModalConfig.js";
import {
  formModalPopup,
  buttonSubmitModalForm,
} from "../utils/constants-form-modal.js";

export const formModalPopupValidator = new formValidator(
  validationModalConfig,
  formModalPopup
);

formModalPopupValidator.enableValidation();
