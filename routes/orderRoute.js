const express=require('express');
const { authanticatedUser, Authoriserole } = require('../Authantication');
const { creatOrder, findorder, finduserorderdetail, updateOrderStatus, canceledOrder } = require('../controller/orderController');

const router=express.Router()

router.route('/order/create').post(authanticatedUser,creatOrder);

router.route('/order/find').get(authanticatedUser,findorder)
router.route('/user/myorder').get(authanticatedUser, finduserorderdetail)
router.route('/order/status/update').put(authanticatedUser, updateOrderStatus)
router.route('/order/status/canceled').get(authanticatedUser,canceledOrder)


module.exports=router;