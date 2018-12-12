const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;
  let bookSchema=new Schema({
  goods_id:{type:String,required:true},
	goods_img:{type:String,required:true},
	goods_name:{type:String,required:true},
	goods_price:{type:String,required:true},
	goods_qty:{type:String,required:true}
  })
  // type 字段类型  required 是否必须
 let bookmodel=mongoose.model('good', bookSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=bookmodel