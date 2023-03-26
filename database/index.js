require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes.js');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
mongoose.set('strictQuery', false);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

app.use(cors());
app.use(express.json());
// order of call here important using models in routes
app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server started at ${3000}`);
});