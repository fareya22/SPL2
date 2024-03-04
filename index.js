
//const mongoose = require('mongoose');
//const TOKEN ='6625585244:AAEjajRPuCyykK6Obn8f2V2fiZZnjt7mAxI';
const TelegramBot = require('node-telegram-bot-api');
const { MongoClient } = require('mongoose');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const bot = new TelegramBot('6625585244:AAEjajRPuCyykK6Obn8f2V2fiZZnjt7mAxI', { polling: true });

// MongoDB connection URI
const uri = 'mongodb+srv://bsse1331:mongodbFAREYA22@cluster0.hodzqty.mongodb.net/employee?retryWrites=true&w=majority';
 // Change this to your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect().then(() => {
    console.log("Connected to MongoDB");

    // Handle /start command
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Welcome to the Saree Store! What are you looking for?');
    });

    // Handle user messages
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text.toLowerCase();

        // Check if the user is looking for sarees
        if (text === 'sharee') { // Note: 'sharee' instead of 'saree'
            try {
                const db = client.db('employee'); // Database name 'employee'
                const collection = db.collection('products'); // Collection name 'products'

                // Fetch saree products from MongoDB
                const products = await collection.find({ productName: "Sharee" }).toArray(); // Query for Sharee products
                const productList = products.map(product => ({
                    name: product.productName,
                    price: product.price
                }));

                // Send the list of saree products
                bot.sendMessage(chatId, 'Here is the list of the products you are looking for. Select one to buy:', {
                    reply_markup: {
                        inline_keyboard: productList.map(product => [{
                            text: `${product.name} - ${product.price}`,
                            callback_data: JSON.stringify({
                                action: 'buy',
                                product: product
                            })
                        }])
                    }
                });
            } catch (error) {
                console.error("Error fetching products:", error);
                bot.sendMessage(chatId, 'Sorry, something went wrong. Please try again later.');
            }
        }
    });

    // Handle callback queries (user selections)
    bot.on('callback_query', (callbackQuery) => {
        const action = JSON.parse(callbackQuery.data).action;
        const product = JSON.parse(callbackQuery.data).product;

        if (action === 'buy') {
            bot.sendMessage(callbackQuery.message.chat.id, `Please pay ${product.price} for ${product.name}`);
        }
    });
}).catch(err => console.error("Error connecting to MongoDB:", err));
