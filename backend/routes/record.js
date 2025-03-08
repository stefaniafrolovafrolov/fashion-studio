const { tgNotify } = require('../telegram/notify');

module.exports = function setRecord(req, res) {
  // !!!Потенциальные ошибки!!! нет проверки на наличие всех полей в req.body,
  tgNotify('Запись на прием\n'
             + `Имя: ${req.body.name}\n`
             + `Телефон: ${req.body.phone}\n`
             + `Услуга: ${req.body.type}`);
  res.status(200);
};
