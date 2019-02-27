const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 

// const items = require('./routes/api/items');

// Item Model
const Item = require('./models/Item');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
// app.use('api/items',  items);

// @route   GET api/items
// @desc    Get All Items
// @access  Public
app.get('/', (req, res) => {
    // res.send('hello world');
    Item.find()
        .sort({ date: -1})
        .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
app.post('/', (req, res) => {
    console.log("hello world");
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item))
    .catch(err => res.status(404).json({success: false}));
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Public
app.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
})

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`server started on port ${port}`));