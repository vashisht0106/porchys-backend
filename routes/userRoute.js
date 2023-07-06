const express=require('express');
const { authanticatedUser, Authoriserole } = require('../Authantication');
const { registeruser, loginUser, logoutUser, forgetPassword, resetPassword, getUserDetail, updateUserPassword, updateProfileDetail, getallUser } = require('../controller/userController');
const router=express.Router();


router.route('/register').post(registeruser);
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forget').post(forgetPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/user/detail').get(authanticatedUser,  getUserDetail);
router.route('/user/password/update').put(authanticatedUser,updateUserPassword)
router.route('/user/update/profile').put(authanticatedUser ,updateProfileDetail)


router.route('/admin/users').get(getallUser)
module.exports=router;