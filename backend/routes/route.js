const express = require('express');
const router = express.Router();
const employeeController = require("../controllers/employee.controllers")
const authController = require('../controllers/auth.controllers')



router.post('/register' , authController().postRegister)
router.post('/login' , authController().postLogin)
router.post('/employee' , employeeController().createEmployee)
router.get('/employee' , employeeController().findallDetails)
router.get('/employee/:id' , employeeController().findOne)
router.delete('/employee/:id' , employeeController().deleteOne)
router.put('/employee/:id' , employeeController().updateEmployee)








module.exports = router;