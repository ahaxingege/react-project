const express=require('express');
const Router=express.Router();
const bookModel=require('../model/bookModel.js');
const util=require('../utils/utli.js')
// const multer=require('multer')
const fs=require('fs');
const path=require("path")
// let upload = multer({ dest: 'tmp/' })//设置图片保存的临时路径



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
// Router.post('/found',(req,res)=>{
// 	  let type=req.body.type;
// 	   bookModel.find({type:type})
// 	.then((data)=>{
// 	   console.log(data)
// 	   if (data.length>=1) { return res.send(data)}
// 	   	res.send("找不到")
// 	})
// })
// 

// Router.post('/found',(req,res)=>{
// 	 console.log(req.body)
// 	 	let type=req.body.type;
// 	 	let total=0
// 	 	bookModel.find({type:type})
// 	 	.then((data)=>{
// 	 	total=res.length
// 	 	res.send(util.sendData(0,'请求ok',data))
// 	 })
// 	 .catch((err)=>{
// 	 	console.log(err)
// 	 	res.send(util.sendData(-1,'请求错误',null))
// 	 })
// })

Router.post('/find',(req,res)=>{
let total=0;
	bookModel.find()
   .then((data)=>{
	  let array={total:total,booklist:data}
	res.send(util.sendData(0,'请求ok',array))
   })
   .catch((err)=>{
	   console.log(err)
	   res.send(util.sendData(-1,'请求错误',null))
   })

	})

Router.post('/addbook',(req,res)=>{
	//typetitlewriterdesc
	// console.log(req.body)
	let {goods_id,goods_img,goods_name,goods_price,goods_qty}=req.body
	bookModel.insertMany( {goods_id,goods_img,goods_name,goods_price,goods_qty})
	.then((data)=>{
		res.send(util.sendData(0,' 增加成功',null))
	})
	.catch((err)=>{
		console.log(err)
		res.send(util.sendData(-1,'增加失败',null))
	})
	
})

// Router.post('/find',(req,res)=>{
// 	//实现分页   总的数据    目标页   每页有3条
// 	 console.log(req.body)
// 	 let type=req.body.type;
//      let pagesize=Number(req.body.pagesize);
//      let target=Number(req.body.target)
//      let total=0
// 	 // console.log(pagesize,target)
// 	 if(type!="全部"){
//      bookModel.find({type:type})
//      .then((res)=>{
//         total=res.length
//        return bookModel.find({type:type}).limit(pagesize).skip((target-1)*pagesize)
//      })
// 	.then((data)=>{
//        let array={total:total,booklist:data}
// 	 res.send(util.sendData(0,'请求ok',array))
// 	})
// 	.catch((err)=>{
// 		console.log(err)
// 		res.send(util.sendData(-1,'请求错误',null))
// 	})
// }else{
// 	bookModel.find()
// 	.then((res)=>{
// 	   total=res.length
// 	  return bookModel.find().limit(pagesize).skip((target-1)*pagesize)
// 	})
//    .then((data)=>{
// 	  let array={total:total,booklist:data}
// 	res.send(util.sendData(0,'请求ok',array))
//    })
//    .catch((err)=>{
// 	   console.log(err)
// 	   res.send(util.sendData(-1,'请求错误',null))
//    })
// }
// 	
// })
// 
// Router.post('/found',(req,res)=>{
// 	//实现分页   总的数据    目标页   每页有3条
// 	 console.log(req.body)
//      let type=req.body.type;
//      bookModel.find({type:type})
//      .then((res)=>{
//         total=res.length
//        return bookModel.find({type:type}).limit(pagesize).skip((target-1)*pagesize)
//      })
// 	.then((data)=>{
//        let array={total:total,booklist:data}
// 	 res.send(util.sendData(0,'请求ok',array))
// 	})
// 	.catch((err)=>{
// 		console.log(err)
// 		res.send(util.sendData(-1,'请求错误',null))
// 	})
	
// })



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

// Router.post('/img',upload.single('test'),(req,res)=>{
//   
//   console.log(req.file)
//   //尺寸限制
//   // 类型限制
//   fs.readFile(req.file.path,(err,data)=>{
//   	if (err) { return res.send("上传错误")}
//   	let  filename=new Date().getTime()+parseInt(Math.random(0,1)*1000)+"."+req.file.mimetype.split('/')[1]
//     // console.log(filename)
//   	fs.writeFile(path.join(__dirname,'../public/img',filename), data,(err)=>{
//   		if (err) return res.send("上传错误")
//   		let array={
//   			err:0,
//   			msg:'ok',
//   			path:'/img/'+filename
//   		}
//   		res.send(array)
//   	});
//   })
// })
// 



Router.post('/delbook',(req,res)=>{

	let id=req.body.id 
	console.log(id)
	if (!id) {res.send(util.sendData(-1,'参数错误',null))}
	bookModel.deleteOne({_id:id})
	.then((data)=>{
	 res.send(util.sendData(0,'删除成功',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'删除失败',null))
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


module.exports=Router;