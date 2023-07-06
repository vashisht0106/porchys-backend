const express = require('express');

const router = express.Router();
const { getallproduct, createProduct, updateProduct, deleteProduct, createReviews, getproductdetail } = require('../controller/productContoller');
const { authanticatedUser, Authoriserole } = require('../Authantication');



router.route('/products').get(getallproduct)
router.route('/product/new').post(authanticatedUser,Authoriserole('admin'),createProduct)
     
router.route('/product/:id').put(authanticatedUser,Authoriserole('admin'),updateProduct)
router.route('/product/delete/:id').delete(authanticatedUser,Authoriserole('admin'),deleteProduct);
router.route('/reviews').put(authanticatedUser, createReviews)

router.route('/product/:id').get(getproductdetail)
module.exports = router;