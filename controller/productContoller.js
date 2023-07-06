
const Product = require('../models/productSchema')
const express = require('express');
const Apifeatures = require('../../utils/Apifeatures');
const Asyn = require('../middileware/Asyn');
//const productSchema = require('../models/productSchema');
//const { ObjectId } = require('mongodb');

// create product admin
exports.createProduct = Asyn(async (req, res) => {
    req.body.user = req.user.id;
    req.body.partner = req.user.name;
    const product = await Product.create(req.body)
    res.status(201).json({ product })
    //    console.log(token);

});


exports.getallproduct = Asyn(async(req, res) => {
    let limit = 20;
    let totalProducts = await Product.countDocuments();

    const apifeature = new Apifeatures(Product.find(), req.query).search().filter();
    

    apifeature.pagination(limit);
    
   let   data = await apifeature.query;

    res.status(200).json(data)
});


//update product--admin

exports.updateProduct = Asyn(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({ success: false, message: "product not available" })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    }
    );

    res.status(200).json({ success: true, product })
    console.log(req.params.id)
});


//delete product
exports.deleteProduct = Asyn(async (req, res, next) => {
    let product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, product })



})



// Create New Review or Update the review
exports.createReviews = Asyn(async(req, res, next) => {
    let { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating,
      comment
    }
//   let id=productid.ObjectId
    let product = await Product.findById(productId);
  console.log(product.numOfReviews,product.ratings)
  let a=product.numOfReviews
  let b=product.ratings
    let isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user.id
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } 
    else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,rating,a,b
    });
  });

  exports.getproductdetail=Asyn( async(req,res,next)=>{

const product=await Product.findById(req.params.id)

if(!product){

res.status(404).json({message:'oops.. product not mach such id'})

}
// console.log(req.query.id)
res.status(200).json({product})
  })