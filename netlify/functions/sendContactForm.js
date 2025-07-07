const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const TELEGRAM_BOT_TOKEN = '8049239964:AAHakqZ26JhHCZy6oifFX2-TuYQ9UfG7whQ';
const CHAT_ID = '1580927808';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST requests allowed',
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { fullName, phone } = data;

    let message = `📥 Yangi bog'lanish:\n`;
    if (fullName) message += `👤 Ism: ${fullName}\n`;
    if (phone) message += `📞 Telefon: ${phone}\n`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    if (!response.ok) {
      return {
        statusCode: 500,
        body: 'Telegram API yuborishda xatolik.',
      };
    }

    return {
      statusCode: 200,
      body: 'Yuborildi',
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: 'Serverda xatolik: ' + err.message,
    };
  }
};
