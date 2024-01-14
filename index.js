const keepAlive = require(`./server`);

const { readFileSync, writeFileSync } = require('fs');
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.token)
console.log('Ready!')
bot.launch()

function checker(correctCount, userInput)
{
  return (userInput.startsWith(correctCount.toString() + ' ')) || (userInput == correctCount.toString())
}

function chatChecker(ctx, chatID, threadID) {
  return (ctx.message.chat.id == chatID) && (ctx.message.message_thread_id == threadID)
}

data = JSON.parse(readFileSync('./counterDB.json'))


bot.on('message', (ctx) => 
  {

    if ((ctx.message.text != null) && (ctx.message.text != NaN) && (ctx.message.text != undefined))
    {    
    console.log(ctx.message.message_thread_id)
    console.log(data)
    

    
    if (chatChecker(ctx, -1001656597866, undefined)) {   
      if ((checker(data.decimal.current + 1, ctx.message.text)) && ctx.from.id != 6900841854) {
        data.decimal.current++
        data.decimal.lastID = ctx.message.message_id
        data.decimal.user = ctx.from.username
        data.decimal.userID = ctx.from.id
      } else {


        isDeleted = false
        bot.telegram.forwardMessage(5930017558, -1001656597866, data.decimal.lastID)
          .catch(err => {
            isDeleted = true
          ctx.reply(`@${data.decimal.user} (${data.decimal.userID}) УДАЛИЛ СООБЩЕНИЕ-ЧИСЛО!! (если такое будет часто, то БАН)))\nТекущее число: ${data.decimal.current}`)
            data.decimal.lastID = ctx.message.message_id
        })
        .then(temp => {
            if (isDeleted == false) {
              ctx.deleteMessage()
            }
        })
        // ctx.deleteMessag`e()
      }
    }


    writeFileSync('./counterDB.json', JSON.stringify(data))}
  })

bot.on('edited_message', (ctx) => {
  
  console.log('WORKED')
  if ((ctx.update.edited_message.message_id == data.decimal.lastID) && (checker(data.decimal.current, ctx.update.edited_message.text) == false))
  {
    ctx.reply(`${data.decimal.current.toString()}: @${ctx.from.username} (изменил число на неверное)`)
    ctx.deleteMessage()
    
  }
})

bot.on('')


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

keepAlive();