const Apifeatures = require("../../utils/Apifeatures");
const Asyn = require("../middileware/Asyn");
const orderSchema = require("../models/orderSchema")
const express = require('express')
exports.creatOrder = Asyn(async (req, res) => {
    req.body.userId = req.user.id;
    req.body.userName = req.user.name;
   
    const { data } = await orderSchema.create(req.body)

    res.status(201).json({ data })

})

exports.findorder = Asyn(async (req, res, next) => {

    const data = await orderSchema.find()
 
    res.status(200).json(data)

})

exports.finduserorderdetail = Asyn(async (req, res) => {
    let id = req.user.id;

    const data = await orderSchema.find({
        $or: [{
            "userId": { $regex: id },




        }]
    })

    const filteredData = data.map((item) => {

        const status = item.orderItem.filter((i) => i.orderStatus == "Processing")




        if (status.length > 0) {
            return {

                "shippingInfo": item.shippingInfo,
                "_id": item.id,
                "paymentStatus": item.paymentStatus,
                "orderYear": item.orderYear,
                "orderMonth": item.orderMonth,
                "orderDate": item.orderDate,
                "orderTime": item.orderTime,
                "orderItem": status,
                "userId": item.userId,
                "userName": item.userName,
            };
        }
    }

    )




    const filter = filteredData.filter(i => i != null);



    res.status(200).json(filter);




})


exports.canceledOrder = Asyn(async (req, res) => {
    let id = req.user.id;

    const data = await orderSchema.find({
        $or: [
            {
                "userId": { $regex: id },

            }]
    })


    const filteredData = data.map((item) => {

        const status = item.orderItem.filter((i) => i.orderStatus == "Cancelled")

        if (status.length > 0) {
            return {
                "shippingInfo": item.shippingInfo,
                "_id": item.id,
                "paymentStatus": item.paymentStatus,
                "orderYear": item.orderYear,
                "orderMonth": item.orderMonth,
                "orderDate": item.orderDate,
                "orderTime": item.orderTime,
                "orderItem": status,
                "userId": item.userId,
                "userName": item.userName,

            }

        }

    })
    const filter = filteredData.filter(i => i != null);



    res.status(200).json(filter);

})



exports.updateOrderStatus = Asyn(async (req, res) => {


const {orderId,orderItemId,orderStatus}=req.body;

const data=await orderSchema.findById(orderId)

const status=data.orderItem.find(i=>i._id==orderItemId)
status.orderStatus=orderStatus;
data.save({validateBeforeSave:false})
res.status(200).json(data)
})