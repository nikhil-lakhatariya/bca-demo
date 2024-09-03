const express = require('express');
require("dotenv").config();
const cors = require('cors');
const indexRoute = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 5000;
require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use('/', indexRoute);

app.get('/', async (req, res) => {
    res.send('Welcome To Task Management');
});

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
})
