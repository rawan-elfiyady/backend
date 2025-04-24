const express = require("express");
const app = express();
const PORT = 8081;
const cors = require("cors");
const authController = require('../backend/Cotrollers/AuthController');


app.use(express.json()); // parse JSON bodies

app.get("/",(req, res) => {
    res.send('Hello')
});

app.use(cors()); 

app.use('/auth', authController);

console.log("Script started");

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})