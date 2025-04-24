const express = require('express');
const router = express.Router();
const AuthServices = require("../Services/AuthServices");

// src/controllers/AuthController.js
router.post('/register', async (req, res, next) => {
    const { role, email, password, name } = req.body;
    try {
        let user;
        switch (role) {
            case 'admin':
                user = await AuthServices.registerAdmin({ email, password, name });
                break;
            case 'pharmacist':
                user = await AuthServices.registerPharmacist({ email, password, name });
                break;
            case 'patient':
                user = await AuthServices.registerPatient({ email, password, name });
                break;
            default:
                const err = new Error(`Invalid role: ${role}`);
                err.status = 400;
                throw err;
        }
        res.status(201).json({
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
