const TelegramBot = require("node-telegram-bot-api");
const token = "5678321814:AAECL7tjBuvShmNRmnHx0NXDEgKaRIkAcWE";

// Создаём бота, который использует polling (опрос) для получения новых обновлений.
const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Стартовое приветствие" },
  { command: "/info", description: "Информация о боте" },
]);

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Я 1 кнопка", callback_data: "Это меня нажали 1" }],
      [{ text: "Я 2 кнопка", callback_data: "Это меня нажали 2" }],
    ],
  }),
};

const startApp = () => {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    if (msg.text == "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/9dd/d00/9ddd006c-2298-381a-9a4d-fa4defcedc91/8.jpg"
      );
      return bot.sendMessage(chatId, "Привет");
    } else if (msg.text == "/info") {
      return bot.sendMessage(chatId, "Это простой бот");
    } else {
      console.log(msg);
      console.log(msg.from.username);
      // send a message to the chat acknowledging receipt of their message
      return bot.sendMessage(chatId, "Пиши мне ещё, я тебя не понял", options);
    }
  });
  bot.on("callback_query", (msg) => {
    console.log(msg.data);
  });
};
startApp();
