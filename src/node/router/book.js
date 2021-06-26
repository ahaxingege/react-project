const express = require('express');
const Router = express.Router();
const bookModel = require('../model/bookModel.js');
const util = require('../utils/utli.js')
const multer = require('multer')
const fs = require('fs');
const path = require("path")
let upload = multer({
	dest: 'tmp/'
}) //设置图片保存的临时路径



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
let obj = {}





Router.post('/find', (req, res) => {
	//实现分页   总的数据    目标页   每页有3条
	console.log(req.body)
	let type = req.body.type;
	let search = req.body.search;
	let pagesize = Number(req.body.pagesize);
	let target = Number(req.body.target)
	let total = 0
	// console.log(pagesize,target)
	if (search) {
		bookModel.find({
				title: {
					$regex: search
				}
			})
			.then((res) => {
				total = res.length
				return bookModel.find({
					title: {
						$regex: search
					}
				}).limit(pagesize).skip((target - 1) * pagesize)
			})
			.then((data) => {
				let array = {
					total: total,
					booklist: data
				}
				res.send(util.sendData(0, '请求ok', array))
			})
			.catch((err) => {
				console.log(err)
				res.send(util.sendData(-1, '请求错误', null))
			})
	} else {

		if (type != "全部") {
			bookModel.find({
					type: type
				})
				.then((res) => {
					total = res.length
					return bookModel.find({
						type: type
					}).limit(pagesize).skip((target - 1) * pagesize)
				})
				.then((data) => {
					let array = {
						total: total,
						booklist: data
					}
					res.send(util.sendData(0, '请求ok', array))
				})
				.catch((err) => {
					console.log(err)
					res.send(util.sendData(-1, '请求错误', null))
				})
		} else {
			bookModel.find()
				.then((res) => {
					total = res.length
					return bookModel.find().limit(pagesize).skip((target - 1) * pagesize)
				})
				.then((data) => {
					let array = {
						total: total,
						booklist: data
					}
					res.send(util.sendData(0, '请求ok', array))
				})
				.catch((err) => {
					console.log(err)
					res.send(util.sendData(-1, '请求错误', null))
				})
		}
	}



})



Router.post('/find_id', (req, res) => {
	//实现分页   总的数据    目标页   每页有3条
	console.log(req.body)
	let id = req.body.id;
	bookModel.find({
			_id: id
		})
		.then((res) => {
			total = res.length
			return bookModel.find({
				_id: id
			})
		})
		.then((data) => {
			res.send(util.sendData(0, '请求ok', data))
		})
		.catch((err) => {
			console.log(err)
			res.send(util.sendData(-1, '请求错误', null))
		})


})


Router.post('/updata', (req, res) => {
	//实现分页   总的数据    目标页   每页有3条
	console.log(req.body)
	let id = req.body.id;
	let type = req.body.type;
	let title = req.body.title;
	let writer = req.body.writer;
	let img = req.body.img;
	let desc = req.body.desc;
	let time = req.body.time;
	// let {type,title,writer,img,desc,time}=req.body


	bookModel.update({
		_id: id
	}, {
		type: type,
		title: title,
		writer: writer,
		img: img,
		desc: desc,
		time: time
	}, {
		multi: true
	}, function(err, raw) {
		if (err) return handleError(err);
		res.send(util.sendData(0, ' 修改成功', null))
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

Router.post('/addbook', (req, res) => {
	//typetitlewriterdesc
	// console.log(req.body)
	let {
		type,
		title,
		writer,
		img,
		desc,
		time
	} = req.body
	bookModel.insertMany({
			type,
			title,
			writer,
			img,
			desc,
			time
		})
		.then((data) => {
			res.send(util.sendData(0, ' 增加成功', null))
		})
		.catch((err) => {
			console.log(err)
			res.send(util.sendData(-1, '增加失败', null))
		})

})

/**
 * @api {post} /upload/img/ 文件上传
 * @apiName uploadimg
 * @apiGroup upload
 *
 * @apiParam {String} test 单文件formdata .
 *
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息.
 * @apiSuccess {String} path 图片的服务器路径
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       err:0,
 * 	     msg:'ok',
 *		 path:'img/1540796695024.png'
 *     }
 */

Router.post('/img', upload.single('test'), (req, res) => {

	console.log(req.file)
	//尺寸限制
	// 类型限制
	fs.readFile(req.file.path, (err, data) => {
		if (err) {
			return res.send("上传错误")
		}
		let filename = new Date().getTime() + parseInt(Math.random(0, 1) * 1000) + "." + req.file.mimetype.split('/')[1]
		// console.log(filename)
		fs.writeFile(path.join(__dirname, '../public/img', filename), data, (err) => {
			if (err) return res.send("上传错误")
			let array = {
				err: 0,
				msg: 'ok',
				path: '/img/' + filename
			}
			res.send(array)
		});
	})
})




Router.post('/delbook', (req, res) => {

	let id = req.body.id
	console.log(id)
	if (!id) {
		res.send(util.sendData(-1, '参数错误', null))
	}
	bookModel.deleteOne({
			_id: id
		})
		.then((data) => {
			res.send(util.sendData(0, '删除成功', data))
		})
		.catch((err) => {
			res.send(util.sendData(-1, '删除失败', null))
		})
})


Router.post('/updata', (req, res) => {

	let id = req.body.id
	let {
		type,
		title,
		writer,
		img,
		desc,
		time
	} = req.body
	bookModel.insertMany({
			type,
			title,
			writer,
			img,
			desc,
			time
		})
		.then((data) => {
			res.send(util.sendData(0, ' 增加成功', null))
		})
		.catch((err) => {
			console.log(err)
			res.send(util.sendData(-1, '增加失败', null))
		})
})






//分类查询
//Router.post('/foodByType',(req,res)=>{
//
//	let type=req.body.type 
//	if (!type) {res.send(util.sendData(-1,'参数错误',null))}
//	foodModel.find({type:type})
//	.then((data)=>{
//	 res.send(util.sendData(0,'查询ok',data))
//	})
//	.catch((err)=>{
//		res.send(util.sendData(-1,'查询失败',null))
//	})
//})


module.exports = Router;
