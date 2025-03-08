const { getTotalRating } = require('../storage/comments');

module.exports = function totalRating(req, res) {
  res.status(200).json({
    total: getTotalRating(req.body.check),
  });
};
