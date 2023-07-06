const ErrorHander = require("../../utils/errorHander");
const userSchema = require("../models/userSchema");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const CryptoJS = require('crypto-js')
// const SendEmail=require('../utils/SendEmail')
const Asyn = require("../middileware/Asyn");
const SendEmail = require("../../utils/SendEmail");
const option = { expires: new Date(Date.now() + process.env.COOKI_EXPIRE * 24 * 60 * 60 * 1000) }

//register user
exports.registeruser = Asyn(async (req, res, next) => {
    let { name, email } = req.body
    let user = await userSchema.create({
        name, email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()

        ,
        avatar: {

            public_id: "samle id",
            url: "sample url"

        }
       
    })

    const token = user.jwtToken();

    res.status(201).cookie('token', token, option).json({ success: true, user, token })


});
//login user

exports.loginUser = Asyn(async (req, res, next) => {

    let { email, password } = req.body;

    //checking user enter email and password
    if (!email || !password) {
        res.status(401).json({ success: false, message: 'email and password can not be empty' })
        //  next(new ErrorHander('please enter email or password', 400))

    }
    const user = await userSchema.findOne({ email }).select("+password");


    if (!user) {

        // return next(new ErrorHander('user not fond please register and login again..',401))
        res.status(401).json({ success: false, message: 'user not found please register first and login again' })
    }
    //compared password
    // const ispasswordMatched = await user.comparePassword(password);
    // if (!ispasswordMatched) {
    //     // return next(new ErrorHander('invalid user or password', 401));
    //     res.status(401).json({ success: false, message: 'invalid user or password please enter valid password or email', })
    // };

    // new rule compare password using crypto js
    const haspassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    let originalpassword = haspassword.toString(CryptoJS.enc.Utf8)
    if (originalpassword != req.body.password) {
        res.status(401).json({ success: false, message: "incorrect email or password" })
    }
    const token = user.jwtToken()
    res.status(200).cookie('token', token, option).json({ success: true, token, user })

})


//logout
exports.logoutUser = Asyn(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(201).json({ message: 'you are Logged out' })

    next();
});

// forget password token genrate
exports.forgetPassword = Asyn(async (req, res, next) => {
    const user = await userSchema.findOne({ email: req.body.email })
    if (!req.body.email) {
        res.status(404).json({ message: 'please enter email id' })
    }
    if (!user) {
        res.status(404).json({ message: 'user not found' })
    }
    let resetToken = user.getforgetPasswordToken();
    await user.save({ validateBeforeSave: false })
    let resetPasswordUrl = req.protocol + '://' + req.get("host") + '/api/v1/password/reset/' + resetToken
    console.log(resetPasswordUrl)
    let message = 'click this link and reset your password \n' + resetPasswordUrl + ' \n\n if this email not sent you please ignore it';
    try {
        await SendEmail({
            email: user.email,
            subject: ' Eccommerce Password Rocevery ',
            message,

        })
        console.log('resetToken is here', resetToken)
        res.status(200).json({ success: true, message: 'password reset link sent to your email  ' + user.email + '  please check' })
    } catch (error) {

        user.resetPasswordExpired = undefined;
        user.resetPasswordExpired = undefined;
        await user.save({ validateBeforeSave: false })
        res.status(500).send(error.message)
    }

});

//reseting  password

exports.resetPassword = Asyn(async (req, res, next) => {

    let resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    let user = await userSchema.findOne({ resetPasswordToken, resetPasswordExpired: { $gt: Date.now() } })
    // await user.save()

    if (!user) {
        res.status(401).json({ message: 'invilid user or expired token ' })

    }
    if (req.body.password != req.body.confirmPassword) {
        res.status(401).json({ messsage: 'password and confirm password should be same' })
    }
    newpassword = req.body.password;
    user.password = CryptoJS.AES.encrypt(newpassword, process.env.SECRET_KEY).toString();
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save()

    const token = user.jwtToken()
    res.status(200).cookie('token', token, option).json({ success: true, message: "password changed successfully done", token })

});

//get user detail

exports.getUserDetail=Asyn(async(req,res,next)=>{


const user= await userSchema.findById(req.user.id);

// let token=jwtToken()
res.status(200).json({success:true,user})

});

exports.getallUser=Asyn(async(req,res,next)=>{

const allUser=await  userSchema.find({
    $or: [{
        "role": { $regex: "user" },
    }]
})

res.status(200).json(allUser);


})


//update password


exports.updateUserPassword=Asyn( async(req,res,next)=>{
    let userUpdate={
        

password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()



    };
    if(req.body.password !=req.body.confirmPassword){res.status(401).json({message:'password and confirm Password should be same'})}

let user=await userSchema.findByIdAndUpdate(req.user.id,userUpdate,{

    new:true,
    runValidators:true,
    usefindAndModify:false,
}).select("+password")

res.status(200).json({message:true,user})
});

// update profile detail
exports.updateProfileDetail=async(req,res,next)=>{
let userDetail={

name:req.body.name,
email:req.body.email,

//avatar:{
//    public_id:'smpke',
//    url:req.body.url}

};

let user=await userSchema.findByIdAndUpdate(req.user.id,userDetail,{
    new:true,
    runValidators:true,
    usefindAndModify:false,
})

res.status(200).json({successe:true,user})
}



