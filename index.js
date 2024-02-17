const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/User');
const ProductModel = require('./models/Product'); 

const app = express();
app.use(express.json());
app.use(cors());

const dbURl = 'mongodb+srv://bsse1331:mongodbFAREYA22@cluster0.hodzqty.mongodb.net/employee?retryWrites=true&w=majority';
mongoose.connect(dbURl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// User authentication routes
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Incorrect Password");
                }
            } else {
                res.json("No record existed");
            }
        });
});

app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});


app.post('/products', (req, res) => {
    ProductModel.create(req.body)
        .then(product => res.json(product))
        .catch(err => res.json(err));
});

app.get('/products', async(req,res)=>{
    const products = await ProductModel.find();
    res.send(products);
})





module.exports = app;
