const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(2).required().messages({
    'string.empty': '"Имя" не должно быть пустым',
    'any.required': '"Имя" обязательно для заполнения',
  }),
  phone: Joi.string().pattern(/^(?:\+7\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}|8\d{10})$/).required().messages({
    'string.empty': '"Телефон" не должен быть пустым',
    'string.pattern.base': '"Телефон" должен начинаться с "+7" или с 8 и содержать от 11 до 15 цифр',
    'any.required': '"Телефон" обязательно для заполнения',
  }),
});

module.exports = {
  schema,
};
