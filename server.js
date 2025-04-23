const express = require("express");
const app = express();
const PORT = 8081;

app.get("/",(req, res) => {
    res.send('Hello')
})

console.log("Script started");

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})