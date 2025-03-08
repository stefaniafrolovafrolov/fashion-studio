const fs = require('node:fs');
const readline = require('node:readline');
const { finished } = require('node:stream/promises');

const {
  getDelayedFilter,
  getVisibleFilter,
  getManagedFilter,
} = require('../filters/comment');

const {
  commentsPerPage, vdb, vdt, ddb, ddt,
} = require('../env');

const delayedComments = [
];

const visibleComments = [
];

const changeFlags = {
  visibleComments: false,
  delayedComments: false,
  lastCommentId: 1,
  totalRating: 0,
  totalRated: 0,
  updateRating: true,
};

async function waitForStream(stream) {
  return await finished(stream);
}

function mergeArrays(page, check) {
  const invalid = []; const validId = []; const valid = []; const
    comments = [];

  let getDelayedFilterNew = getDelayedFilter;
  if (Array.isArray(check)) {
    check.filter(
      (item) => delayedComments.filter(
        (wait) => wait.id === item,
      )
        .length === 0,
    )
      .forEach(

        (item) => invalid.push(item),
      );

    check.filter(
      (item) => !invalid.includes(item),
    )
      .forEach(

        (item) => validId.push(item),
      );

    delayedComments.filter(
      (item) => validId.includes(item.id),
    )

      .forEach(

        (item) => valid.unshift(item),
      );
  } else {
    delayedComments.forEach(

      (item) => valid.unshift(item),
    );

    getDelayedFilterNew = getManagedFilter;
  }

  const maxPages = Math.trunc((visibleComments.length
                               + valid.length
                               + commentsPerPage - 1) / commentsPerPage);

  let skipIndex = (page - 1) * commentsPerPage; let valIndex = 0;
  let visIndex = visibleComments.length - 1;

  for (; skipIndex > 0 && visIndex >= 0
           && valIndex < valid.length; skipIndex -= 1) {
    if (new Date(visibleComments[visIndex].date) >= new Date(valid[valIndex].date)) {
      visIndex -= 1;
    } else {
      valIndex += 1;
    }
  }

  for (; skipIndex > 0 && visIndex >= 0; skipIndex -= 1) visIndex -= 1;

  for (; skipIndex > 0 && valIndex < valid.length; skipIndex -= 1) valIndex += 1;
  if (skipIndex === 0) {
    while (comments.length < commentsPerPage
             && valIndex < valid.length && visIndex >= 0) {
      if (new Date(visibleComments[visIndex].date) >= new Date(valid[valIndex].date)) {
        comments.push(getVisibleFilter(visibleComments[visIndex]));

        visIndex -= 1;
      } else {
        comments.push(getDelayedFilterNew(valid[valIndex]));

        valIndex += 1;
      }
    }

    while (comments.length < commentsPerPage && visIndex >= 0) {
      comments.push(getVisibleFilter(visibleComments[visIndex]));

      visIndex -= 1;
    }

    while (comments.length < commentsPerPage
             && valIndex < valid.length) {
      comments.push(getDelayedFilterNew(valid[valIndex]));

      valIndex += 1;
    }
  }
  return {
    pages: (maxPages === 0 ? 1 : maxPages),
    selected: page,
    comments,
    invalid,
  };
}

function movId(res, id = 0) {
  const filtered = []; const moved = [];
  const prevDelayedCommentsLength = delayedComments.length;
  const prevVisibleCommentsLength = visibleComments.length;
  delayedComments.forEach(
    (item, index) => {
      if (item.id === id) filtered.unshift(index);
    },
  );
  const updateRating = (item) => {
    if (item.rate > 0) {
      changeFlags.totalRating += item.rate - 1;
      changeFlags.totalRated += 1;
    }
  };

  if (filtered.length > 0) {
    filtered.forEach(
      (index) => {
        moved.push(delayedComments.splice(index, 1)

          .pop());
      },
    );
    moved.forEach((item) => {
      const dateI = new Date(item.date);
      if (visibleComments.length === 0) {
        visibleComments.push(item);
        updateRating(item);
      } else {
        for (let index = visibleComments.length - 1; index >= 0; index -= 1) {
          if (new Date(visibleComments[index].date) <= dateI) {
            visibleComments.splice(index + 1, 0, item);
            updateRating(item);
            break;
          } else if (index === 0) {
            visibleComments.unshift(item);
            updateRating(item);
          }
        }
      }
    });
    changeFlags.visibleComments = prevVisibleCommentsLength < visibleComments.length;
    changeFlags.delayedComments = prevDelayedCommentsLength > delayedComments.length;
    res.status(200).json({
      message: 'all done!',
    });
  } else {
    res.status(404).json({
      message: "Can't accept!",
    });
  }
  return moved;
}

function delId(res, id = 0) {
  const filtered = []; const removed = [];
  const prevDelayedCommentsLength = delayedComments.length;

  delayedComments.forEach(
    (item, index) => {
      if (item.id === id) filtered.unshift(index);
    },
  );

  if (filtered.length > 0) {
    filtered.forEach(
      (index) => {
        removed.push(delayedComments.splice(index, 1)
          .pop());
      },
    );

    changeFlags.delayedComments = prevDelayedCommentsLength > delayedComments.length;
    res.status(200).json({
      message: 'all done!',
    });
  } else {
    res.status(404).json({
      message: "Can't delete!",
    });
  }
  return removed;
}

function remId(res, id = 0) {
  const filtered = []; const removed = [];
  const prevVisibleCommentsLength = visibleComments.length;
  visibleComments.forEach(
    (item, index) => {
      if (item.id === id) filtered.unshift(index);
    },
  );

  if (filtered.length > 0) {
    filtered.forEach(
      // Функция обработки элементов массива
      (index) => {
        // Удаляем комментарий из массива вновь добавленных
        // комментариев по индексу...
        const comment = visibleComments.splice(index, 1).pop();
        // Проверим рейтинг этого комментария и скорректируем предрасчитанный
        if (comment.rate > 0) {
          // Меньшаем суммарный рейтинг
          changeFlags.totalRating -= comment.rate - 1;
          // Уменьшаем количество
          changeFlags.totalRated -= 1;
          // Если общая сумма стала меньше нуля,...
          if (changeFlags.totalRating < 0) {
            // ...тогда корректируем...
            changeFlags.totalRating = 0;
            // ...и сообщем об ошибке в вычислениях!
            console.log('Ошибка в вычислениях: totalRating < 0!');
          }
          // Если количество стало меньше нуля,...
          if (changeFlags.totalRated < 0) {
            // ...тогда корректируем...
            changeFlags.totalRated = 0;
            // ...и сообщем об ошибке в вычислениях!
            console.log('Ошибка в вычислениях: totalRated < 0!');
          }
        }
        // Сохраняем удаленный комментарий для информирвания
        removed.push(comment);
      },
    );
    // Установка флага для сохранения массива видимых
    // комментариев на диск т.к. в него внесли изменения
    changeFlags.visibleComments = prevVisibleCommentsLength > visibleComments.length;
    // Сигнализируем об успешном окончании операции
    res.status(200).json({
      message: 'all done!',
    });
  } else {
    // Сигнализируем об ошибке при выполнении операции
    res.status(404).json({
      message: "Can't remove!",
    });
  }
  // Возвращаем массив удаленных элементов
  return removed;
}

// Функция загрзки массива комментариев из файла
function loadArrayFromDisk(arr, fname) {
  // Создание объекта для построчного доступа к файлу
  const lines = readline.createInterface({
    // Открытие для чтения указанного в параметрах файла
    input: fs.createReadStream(fname),
    // Длина строк не ограничена
    crlfDelay: Infinity,
  });
  // Ачинхронное чтение строк из файла
  lines.on(
    'line',
    // Функция обработки следующей прочитанной строки
    (line) => {
      // Преобразование строки в объект через JSON парсер
      // Тут потенциально могут быть ошибки, из-за которых
      // будет падать сервер
      const val = JSON.parse(line);
      // Вычисление номеров идентификаторов для сравнения
      const id = Number(val.id); const
        nid = Number(val.id) + 1;
      // Если текущее значение идентификатора равно или меньше
      // того, которое имеет считанный из файла комментарий
      if (Number(changeFlags.lastCommentId) <= id)
      // Корректировка идентификатора для нового комментария
      { changeFlags.lastCommentId = nid; }
      // Добавление в массив нового комментария из файла
      arr.push(val);
    },
  );
}

function writeArrayToDisk(arr, ftemp, fname, flush) {
  // Создание объекта для доступа к временному файлу на диске
  const wr = fs.createWriteStream(`./${ftemp}`, { });
  // Запись всех элементов из массива в файл
  arr.forEach(
    // Функция обработки элементов
    (item) => {
      // Записать в файл строку предварительно преобразовав
      // элемент в JSON
      wr.write(`${JSON.stringify(item)}\n`);
    },
  );
  // Закончить запись в файл
  wr.end('');
  // Ожидание окончания записи на диск
  waitForStream(wr).then(
    // Функция, которая выполнит финальные действия
    () => {
      // Сброс
      flush();
      // Удаление старого файла
      fs.unlinkSync(`./${fname}`);
      // Переименование только что сохраненного файла
      fs.renameSync(`./${ftemp}`, fname);
    },
  );
}

// Функция загрузки с диска массивов с комментариями
function loadCommentsArrays() {
  console.log(`Загрузка "${vdb}". . .`);
  // Загрузка массива видимых комментариев
  loadArrayFromDisk(visibleComments, `./${vdb}`);
  console.log(`Загрузка "${vdb}" завершена.`);
  console.log(`Загрузка "${ddb}". . .`);
  // Загрузка массива вновь добавленных комментариев
  loadArrayFromDisk(delayedComments, `./${ddb}`);
  console.log(`Загрузка "${ddb}" завершена.`);
}

// Функция записи массивов с комментариями на диск
function saveCommentsArray() {
  // Если массив видимых комментариев был изменен
  if (changeFlags.visibleComments) {
    // Записываем его в соответствующий файл
    writeArrayToDisk(
      visibleComments,
      vdt,
      vdb,
      // и сбрасываем флаг
      () => changeFlags.visibleComments = false,
    );
  }
  // Если массив вновь добавленных комментариев был изменен
  if (changeFlags.delayedComments) {
    // Записываем его в соответствующий файл
    writeArrayToDisk(
      delayedComments,
      ddt,
      ddb,
      // и сбрасываем флаг
      () => changeFlags.delayedComments = false,
    );
  }
}

// Функция для формирования объекта комментария
function makeComment(name, phone, rate, text) {
  // Дата и время в формате UTC/GMT
  const now = new Date();
  // Объект хранения комментария от пользователя
  const comment = {
    // идентификатор комментария
    id: changeFlags.lastCommentId,
    // имя пользователя
    name,
    // дата в ISO формате
    date: now.toISOString(),
    // Оценка
    rate,
    // текст комментария
    text,
    // телефон
    phone,
  };
  // учет в базе наличия созданного объекта
  changeFlags.lastCommentId += 1;
  // добавление объекта в массив вновь добавленных комментариев
  delayedComments.push(comment);
  // Установка флага изменения в массиве вновь добавленных комментариев
  changeFlags.delayedComments = true;
  // возвращаем объект (для информирования в ТГ)
  return comment;
}

// Функция для вычисления общего рейтинга
function getTotalRating(check) {
  if (changeFlags.updateRating) {
    console.log(`Необходимо обновление параметров оценок!`);
    visibleComments.forEach((comment) => {
      // Если комментарий оценен, тогда
      if (comment.rate > 0) {
        // ...посчитали попугаев
        changeFlags.totalRated += 1;
        // ...сложили удавов
        changeFlags.totalRating += comment.rate - 1;
      }
    });
    changeFlags.updateRating = false;
  }
  console.log('Вычисление оценки видимой пользователем. . .');
  // Получение набора комментариев, сохраненных у пользователя, но имеющих оценки
  const rates = delayedComments.filter((item) => check.includes(item.id) && item.rate != 0);
  // Инициализация счетчика для оценок пользователя не прошедших модерацию
  let delay = 0; let
    count = 0;
  // Вычисление суммы оценок пользователя не прошедших модерацию
  rates.forEach((item) => {
    if (item.rate > 0) {
      delay += item.rate - 1;
      count += 1;
    }
  });
  // Вычисление общего количества учтенных оценок
  const total = count + changeFlags.totalRated;
  // Возврат посчитанного значения общего рейтинга
  return total > 0 ? (changeFlags.totalRating + delay) / total : -1;
}

// Экспортируемые функции из модуля
module.exports = {
  getTotalRating,
  loadCommentsArrays,
  saveCommentsArray,
  movId,
  delId,
  remId,
  mergeArrays,
  makeComment,
};
