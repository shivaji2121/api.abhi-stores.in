const express = require('express');
require('dotenv').config();

const connectDB = require('./src/config/database');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    connectDB();
})