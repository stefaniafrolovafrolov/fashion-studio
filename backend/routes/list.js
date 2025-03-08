const { mergeArrays } = require('../storage/comments');

module.exports = function listComments(req, res) {
  // !!!Потенциальные ошибки!!! нет проверки на наличие всех полей в req.body
  res.status(200).json(mergeArrays(req.query.page || 1, req.body.validate));
};
