const express = require('express');

const addComment = require('./add');
const listComments = require('./list');
const setRecord = require('./record');
const totalRating = require('./total');
const {
  acceptComment, deleteComment, removeComment, manageComments,
} = require('./manage');
const { writingTo } = require('./formRoutes');

const router = express.Router();

router.post('/submit-form', writingTo);
router.post('/accept', acceptComment);
router.post('/add', addComment);
router.post('/delete', deleteComment);
router.post('/list', listComments);
router.post('/manage', manageComments);
router.post('/record', setRecord);
router.post('/remove', removeComment);
router.post('/total', totalRating);

module.exports = router;
