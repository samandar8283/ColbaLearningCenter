const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Only POST requests are allowed',
        };
    }

    try {
        const data = JSON.parse(event.body);
        const { fullname, number, visit, grade } = data;

        let message = `📥 Yangi ariza:\n`;
        if (fullname) message += `👤 Ism: ${fullname}\n`;
        if (number) message += `📞 Telefon: ${number}\n`;
        if (visit) message += `🏫 Tashrif: ${visit === "yes" ? "Ha, albatta" : "Yo'q, viloyatdamiz"}\n`;
        if (grade) message += `🎓 O‘qimoqchi bo‘lgan sinf: ${grade}\n`;

        const url = `https://api.telegram.org/bot${"8049239964:AAHakqZ26JhHCZy6oifFX2-TuYQ9UfG7whQ"}/sendMessage`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: 1580927808,
                text: message,
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            return {
                statusCode: 500,
                body: `Telegramga yuborilmadi: ${errText}`,
            };
        }

        return {
            statusCode: 200,
            body: 'Xabar yuborildi!',
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Serverda xatolik: ${error.message}`,
        };
    }
};