const { tgNotify } = require('../telegram/notify');
const { makeComment } = require('../storage/comments');

module.exports = function addComment(req, res) {
  // !!!Потенциальные ошибки!!! нет проверки на наличие всех полей в req.body
  const comment = makeComment(req.body.name, req.body.phone, req.body.rate, req.body.text);
  tgNotify(`Новый комментарий от ${comment.date}\n`
             + `Имя: ${comment.name}\n`
             + `Телефон: ${comment.phone}\n`
             + `Текст: ${comment.text}\n`
             + `Оценка: ${comment.rate == 0 ? 'не поставили' : (comment.rate - 1) / 2}`);
  res.status(200).json({

    id: comment.id,

    date: comment.date,
  });
};
