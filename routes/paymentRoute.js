 const express=require('express');
 const { authanticatedUser } = require('../Authantication');
 const { processPayment, sendStripeKey } = require('../controller/paymentController');


 const router=express.Router()

 router.route('/checkout/payment').post(authanticatedUser,processPayment)
 router.route('/checkout/fetchapikey').get(authanticatedUser,sendStripeKey)
 module.exports=router;