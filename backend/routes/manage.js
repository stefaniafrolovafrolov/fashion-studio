const { tgNotify } = require('../telegram/notify');
const {
  movId, delId, remId, mergeArrays,
} = require('../storage/comments');

function justNotify(head = '', comment) {
  return tgNotify(`Модератор ${head}:\n`
                    + `${comment.id} от ${comment.date}\n`
                    + `Имя: ${comment.name}\n`
                    + `Телефон: ${comment.phone}\n`
                    + `Текст: ${comment.text}`);
}

function acceptComment(req, res) {
  // !!!Потенциальные ошибки!!! нет проверки на наличие всех полей в req.body,

  const moved = movId(res, req.body.id || 0);

  moved.forEach((comment) => justNotify('одобрил комментарий', comment));
}

function deleteComment(req, res) {
  // !!!Потенциальные ошибки!!! нет проверки на наличие всех полей в req.body,
  const removed = delId(res, req.body.id || 0);

  removed.forEach((comment) => justNotify('удалил невидимый комментарий', comment));
}

function removeComment(req, res) {
  // !!!Потенциальные ошибки!!! нет проверки на наличие всех полей в req.body,
  //                            а так как я это фиксирую делать не стоит!
  const removed = remId(res, req.body.id || 0);

  removed.forEach((comment) => justNotify('удалил комментарий', comment));
}

function manageComments(req, res) {
  res.status(200).json(mergeArrays(req.query.page || 1));
}

module.exports = {
  acceptComment, deleteComment, removeComment, manageComments,
};
