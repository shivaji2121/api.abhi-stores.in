const express = require('express');
require('dotenv').config();

const connectDB = require('./src/config/database');
const cookieParser = require('cookie-parser');
const { userRoutes } = require("./src/routes/user.routes");


const app = express();

app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 3000;

app.use('/auth', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    connectDB();
})