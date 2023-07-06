const { SchemaTypeOptions } = require('mongoose')
const nodemailer=require('nodemailer')

const SendEmail=async(options)=>{

let smtptransporter=nodemailer.createTransport({
host:process.env.HOST_SEC,
port:process.env.PORT_SEC,
secure:false,
service:'gmail',
auth:{
user:'kumarvashisht01061999@gmail.com',
pass:'lqmtbeudbuadgcmf'


},


});

const mailOption={
from:'kumarvashisht01061999@gmail.com',
to:options.email,
subject:options.subject,
text:options.message,
}
await smtptransporter.sendMail(mailOption)
};
module.exports=SendEmail;