const express = require("express");
const app = express();
const PORT = 8081;
const cors = require("cors");
const authController = require('../backend/Cotrollers/AuthController');
const adminController = require('../backend/Cotrollers/AdminController');
const patientController = require("../backend/Cotrollers/PatientController");


app.use(express.json()); // parse JSON bodies

app.get("/",(req, res) => {
    res.send('Hello')
});

app.use(cors()); 

app.use('/auth', authController);
app.use('/admin', adminController);
app.use('/patient', patientController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})