const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({

    shippingInfo:
    {
        name: {
            type: String, required: true
        },
        flatno: {

            type: String, required: true

        },
        locality: {

            type: String,
            required: true

        },

        city: {
            type: String, required: true
        },

        state: {
            type: String, required: true
        },

        pincode: {
            type: Number, required: true
        },

        landmark: {

            type: String, required: true
        },

        phoneno: {
            type: Number, required: true
        },
    },






    //orderStatus:{
    //    type: String, required: true, default: 'Processing'
    //},




    paymentStatus: {
        type: String, required: true, default: "Cash On Delivery"
    },
    orderYear: {
        type: String, default: new Date().getFullYear()
    },
  
    orderMonth: {
        type: String, default:0+new Date().getMonth()
    },
    orderDate: {
        type: String, default: new Date().getDate()
    },
    orderTime: {
        type:String, requird:true
    
    },
    

    orderItem:[{


    name:{type:String,required:true},
    quantity:{type:Number,required:true},
    product:{type:String,required:true},
    images:[{

url:{type:String,required:true}


    }],
    price:{type:Number,required:true},



    orderStatus:{
        type: String, required: true, default: 'Processing'
    },

    











   









    
}],
userId:{ type: String ,required:true},
userName:{ type: String ,required:true},

})


module.exports = mongoose.model('order', orderSchema)











