const stripe=require('stripe')(process.env.STRIPE_SEC_KEY)

exports.processPayment=async(req,res,next)=>{

const myPayment=await stripe.paymentIntents.create({

amount:req.body.amount,

currency:'inr',

metadata:{

company:'ecommerce'    
}
})
res.status(200).json({success:true,client_secret:myPayment.client_secret})

}

exports.sendStripeKey=async(req,res,next)=>{

    res.status(200).json({sucess:true,stripeApiKey:process.env.STRIPE_API_KEY})
}