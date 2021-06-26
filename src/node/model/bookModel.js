const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;

  let bookSchema=new Schema({
  time:{type:String,required:true},
	type:{type:String,required:true},
	title:{type:String,required:true},
	writer:{type:String,required:true},
	img:{type:String,required:true},
	desc:{type:String,required:true},
  })
  // type 字段类型  required 是否必须
 let bookmodel=mongoose.model('book', bookSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=bookmodel