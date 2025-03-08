const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes/index');
const { loadCommentsArrays, saveCommentsArray } = require('./storage/comments');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT } = require('./env');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(helmet());

app.use('/backend', router);

loadCommentsArrays();

app.use(errorLogger);

app.use(handleError);

app.listen(
  PORT,
  () => {
    setInterval(saveCommentsArray, 1000);
    console.log(`Сервер запущен на порту ${PORT}`);
  },
);
