const {Telegraf} = require('telegraf');
const token = "5601769903:AAGvEG6dquBgKLQ-tHufzcgrVN2IUyUgrJo"

const bot = new Telegraf(token);

bot.start((ctx) => ctx.reply('Welcome', {
    reply_markup: {
        keyboard: [[{
            text: "webapp",
            web_app: {url: "https://fantastic-fairy-634385.netlify.app"}
        }]]
    }
}));
bot.launch();