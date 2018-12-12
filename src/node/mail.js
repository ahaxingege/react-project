'use strict';
const nodemailer = require('nodemailer');

// nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'qq',//邮箱的服务商
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "1586545565@qq.com", // 默认邮箱
            pass: 'seckfnloduwxfifg' // //smtp 授权码
        }
    });




    function sendmail(mail,msg){
        return new Promise((resolve,reject)=>{
                // 发送邮件相关信息
                console.log(mail)
            let mailOptions = {
                from: '1586545565@qq.com', // sender address
                to: mail, // list of receivers
                subject: '文章管理系统邮箱验证', // Subject line
                text:msg // plain text body
                //html: '<b>Hello world?</b>' // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {reject(error)}
                resolve('ok')
            })
        })
    }
    // sendmail('1586545565@qq.com','123')
    module.exports={sendmail};
// });