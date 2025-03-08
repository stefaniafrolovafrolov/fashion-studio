// Подключаем файл .env к проекту
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const { TOKEN } = process.env;
const { CHAT_ID } = process.env;
const FILENAME_DELAYED_DATABASE = process.env.FILENAME_DELAYED_DATABASE || 'delayed.dat';
const FILENAME_DELAYED_TEMPORARY = process.env.FILENAME_DELAYED_TEMPORARY || 'delayed.tmp';
const FILENAME_VISIBLE_DATABASE = process.env.FILENAME_VISIBLE_DATABASE || 'visible.dat';
const FILENAME_VISIBLE_TEMPORARY = process.env.FILENAME_VISIBLE_TEMPORARY || 'visible.tmp';
const COMMENTS_PER_PAGE = process.env.COMMENTS_PER_PAGE || 5;

const ddb = FILENAME_DELAYED_DATABASE;
const ddt = FILENAME_DELAYED_TEMPORARY;
const vdb = FILENAME_VISIBLE_DATABASE;
const vdt = FILENAME_VISIBLE_TEMPORARY;
const commentsPerPage = Number(COMMENTS_PER_PAGE);

module.exports = {
  PORT,
  TOKEN,
  CHAT_ID,
  FILENAME_DELAYED_DATABASE,
  FILENAME_DELAYED_TEMPORARY,
  FILENAME_VISIBLE_DATABASE,
  FILENAME_VISIBLE_TEMPORARY,
  COMMENTS_PER_PAGE,
  commentsPerPage,
  vdb,
  vdt,
  ddb,
  ddt,
};
