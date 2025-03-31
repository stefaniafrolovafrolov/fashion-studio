import { formValidator } from "./formValidator.js";

import { validationCommentsConfig } from "../utils/validationCommentsConfig.js";

import {
  formComments,
  buttonSubmitComments,
} from "../utils/constants-reviews-form.js";

const formCommentsValidator = new formValidator(
  validationCommentsConfig,
  formComments
);

formCommentsValidator.enableValidation();
