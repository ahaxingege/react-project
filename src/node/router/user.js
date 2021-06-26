const express=require('express');
const Router=express.Router();

const userModel=require('../model/userModel.js');
const mail=require('../mail.js')
const util=require('../utils/utli.js')
/**
 * @api {post} /user/login/ login
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} us Users unique ID.
 * @apiParam {String} pass Users unique ID.
 *
 * @apiSuccess {String} err Firstname of the User.
 * @apiSuccess {String} msg  Lastname of the User.
 */
 let obj={}
Router.post('/login',(req,res)=>{
	let {us,pass}=req.body
	userModel.find( {us,pass})
	.then((data)=>{
	   console.log(data)
	   if (data.length>=1) { return res.send(util.sendData(0,'登陆成功！',null))}
	   	res.send("登录失败")
	})
	
})
/**
 * @api {post} /user/reg/ 注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} us Users unique ID.
 * @apiParam {String} pass Users unique ID.
 *
 * @apiSuccess {String} err Firstname of the User.
 * @apiSuccess {String} msg  Lastname of the User.
 */

Router.post('/reg',(req,res)=>{
	let {us,pass,code}=req.body
	if (obj[us]!==code) { return res.send(util.sendData(-1,'验证码错误',null) )}
	userModel.insertMany({us,pass})
	.then((data)=>{
		res.send(util.sendData(0,'注册ok 请登录',null))
	})
	.catch((err)=>{
		console.log(err)
		res.send(util.sendData(-1,'注册失败',null))
	})
	
})
// 获取邮箱验证码

/**
 * @api {post} /user/getcode/ 获取邮箱验证码
 * @apiName getcode
 * @apiGroup User
 *
 * @apiParam {String} email 用户邮箱
 *
 * @apiSuccess {String} err Firstname of the User.
 * @apiSuccess {String} msg  Lastname of the User.
 */
Router.post('/getcode',(req,res)=>{
	console.log(req)
	let {email}=req.body
	if (!email||email=="") {return res.send(util.sendData(-1,'参数错误',null))}
    let num1=(parseInt(Math.random(0,1)*10000)).toString()
    //生成验证码
	mail.sendmail(email,num1)
	.then((resolve)=>{
		obj[email]=num1
		res.send(util.sendData(0,'验证码已发送',null))
	})
	.catch((err)=>{
		// console.log(err)
		res.send(util.sendData(-1,'验证码发送失败',null))
	})
	
})
module.exports=Router;