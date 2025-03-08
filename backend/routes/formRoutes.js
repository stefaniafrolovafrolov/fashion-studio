const https = require('https');
const { schema } = require('../validation/validation');

const { TOKEN, CHAT_ID } = require('../env');

async function writingTo(req, res) {
  const err500 = 'Ошибка отправки сообщения в Telegram.';
  try {
    await schema.validateAsync(req.body);

    const { name, phone } = req.body;
    console.log('Received form data:', { name, phone });

    const message = `Новое сообщение:\nИмя: ${name}\nТелефон: ${phone}`;

    console.log(message);

    const data = JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    });

    console.log(data);

    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const request = https.request(options, (response) => {
      let responseData = '';

      response.on('data', (chunk) => {
        responseData += chunk;
      });

      response.on('end', () => {
        console.log('Сообщение отправлено в Telegram:', responseData);
      });
    });

    request.on('error', (error) => {
      console.error('Ошибка при отправке сообщения в Telegram:', error);
      throw new Error(err500);
    });

    request.write(data);
    request.end();
    return res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.log(error);
    if (error.details[0].message === err500) {
      return res.status(500).json({ message: error.details[0].message });
    }
    return res.status(400).json({ message: error.details[0].message });
  }
}

module.exports = { writingTo };
