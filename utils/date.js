// exports.createReviews = async (req, res, next) => {


//     const { comment,  productId, rating} = req.body;

// const review={
 
// productid,
// rating:Number(rating),
// comment,

// };
//     const product = await Product.findById(productId);
// console.logS(product)
//     const isReviewed = product.reviews.find((rev)=>
//         rev.user.toString() === req.user._id.toString()


//     )

// if(isReviewed){
// product.reviews.forEach((rev) => 
// rev.user.toString() === req.user._id.toString()
//   (rev.comment=comment),(rev.rating=rating)
    
// )


// }
// else{
// product.reviews.push(review)
// product.numOfReviews=product.reviews.length


// }
// product.reviews.forEach((rev)=>{
// avg+=rev.rating

// })

// product.ratings=avg/product.reviews.length
// await product.save({validateBeforeSave:false})
// res.status(200).json({message:'comment added successfully done'})
// }

