const { TOKEN, CHAT_ID } = require('../env');

function tgNotify(message) {
  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        chat_id: CHAT_ID,
        text: message,
      },
    ),
  });
}

module.exports = { tgNotify };
