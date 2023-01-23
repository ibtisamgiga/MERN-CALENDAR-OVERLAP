const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const authController=require('../controller/authcontroller')

// router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
// router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.post('/user-details',authController.user_details)
// router.get('/logout', authController.logout_get)

module.exports = router