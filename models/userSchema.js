 const mongoose = require('mongoose')
const validator = require('validator')
const crypto=require('crypto')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const CryptoJS=require('crypto-js')
const userSchema = new mongoose.Schema({
    name: {


        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name can not exceed 30 char"],
        minLength: [5, "name should be greator than 5 char"]

    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        validate: [validator.isEmail, "please Enter Valid  Email "],



    },
    password: {

        type: String,
        required: [true, "please enter password"],
        minLength: [8, "password should be greater than 8 characters"],
        select: false,



    },
    avatar: {
        public_id: { type: String, required: true },

        url: { type: String, required: true },




    },
    role: {
        type: String,
        default: 'user'

    },
    resetPasswordToken: String,
    resetPasswordExpired: String,







})
// password bcrypt rocess
// userSchema.pre('save', async function (next) {
//     if (!this.isModified("password")) {
//         next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);

// });




//jwt token genrate
userSchema.methods.jwtToken= function(){
return jwt.sign({
    id:this._id},
    process.env.JWT_SEC,
    {expiresIn:'3d'},
    

)


};
//compared password



// userSchema.methods.comparePassword= async function(password){    
    
//      return await   bcrypt.compare(password,this.password);
    
// };

//generating reset token
userSchema.methods.getforgetPasswordToken=function(){

const token=crypto.randomBytes(20).toString('hex');

this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
this.resetPasswordExpired=Date.now()+2*60*1000;
console.log('token=',token, 'reset password token=',this.resetPasswordToken)
return token;
}

module.exports = mongoose.model("user", userSchema)
