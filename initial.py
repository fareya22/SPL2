from telegram.ext import Updater, CommandHandler, MessageHandler, filters

# Define your token here
TOKEN = "6625585244:AAEjajRPuCyykK6Obn8f2V2fiZZnjt7mAxI"

# Function to handle the /start command
def start(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text='Hi! I am your bot.')

# Function to handle normal messages
def echo(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=update.message.text)

# Function to handle unknown commands
def unknown(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text="Sorry, I didn't understand that command.")

def main():
    # Create the Updater and pass it your bot's token
    updater = Updater(token=TOKEN, use_context=True)

    # Get the dispatcher to register handlers
    dp = updater.dispatcher

    # Register command handlers
    dp.add_handler(CommandHandler("start", start))

    # Register a message handler for normal messages
    dp.add_handler(MessageHandler(filters.text & ~filters.command, echo))

    # Register an unknown command handler
    dp.add_handler(MessageHandler(filters.command, unknown))

    # Start the Bot
    updater.start_polling()

    # Run the bot until you press Ctrl-C or the process receives SIGINT, SIGTERM or SIGABRT
    updater.idle()

if __name__ == '__main__':
    main()
