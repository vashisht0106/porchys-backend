const telegramBot=require('node-telegram-bot-api');

const TOKEN=`5842406535:AAFFr1Hh_qvUbkVVrsiAZpiRj1AF_dSDXag`;


const bot=new telegramBot(TOKEN,{polling:true});


bot.on('message',(message)=>{

console.log(message);

});


