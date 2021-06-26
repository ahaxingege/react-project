// 接收url中的参数


function query(_name){
	var str = location.search; // str="?a=1&b=2"
	if(str != ""){
		var arr = str.substring(1).split("&");  //"a=1&b=2".split("&") -> ["a=1","b=2"]
		for( var i=0,len=arr.length; i<len; i++ ){
			var a = arr[i].split("=");	// "a=1".split("=") -> ["a","1"]
			if( a[0]==_name ){
				return a[1];
			}
		}
	}
}


var id = query("id");
console.log(id);

let rootapi = 'http://localhost:3978/'

$.post(rootapi + 'api/book/find_id', {id:id}, function(res) {
	console.log(res)
		if (res.err == 0) {
			loadingTbody(res.data);
			
		} else {
			alert(res.msg)

		}
	}, 'json')



function loadingTbody(data) {
	console.log(data)
	var allString = '';

	for (var i = 0; i < data.length; i++) {
		var tr =`<tbody>
								<tr>
									<th width="120"><i class="require-red">*</i>分类：</th>
									<td>
										<select name="search-sort" id="catid" text="${data[0].type}";>
											<option value="全部">全部</option>
											<option value="玄幻">玄幻</option>
											<option value="穿越">穿越</option>
											<option value="武侠">武侠</option>
											<option value="科幻">科幻</option>
											<option value="都市">都市</option>
										</select>
											
									</td>
								</tr>
								<tr>
									<th><i class="require-red">*</i>标题：</th>
									<td>
										<input id="title" class="common-text required"  name="title" size="50" value="${data[0].title}" type="text">
									</td>
								</tr>
								<tr>
									<th>作者：</th>
									<td><input id="writer" class="common-text" name="author" size="50" value="${data[0].writer}" type="text"></td>
								</tr>
								<tr>
									<th><i class="require-red">*</i>缩略图：</th>
									<td>
										<input type="file" id="imagelist" >
										<img id="tmpimg" src="${rootapi}${data[0].img}">
										<button id="filebtn" type="button">上传</button>
									</td>
								</tr>
								<tr>
									<th>内容：</th>
									<td><textarea textareaContents:"${data[0].desc}" name="content" class="common-textarea" id="content" cols="30" style="width: 98%;" rows="10"></textarea></td>
								</tr>
								<tr>
									<th></th>
									<td>
										<input id="addbtn" class="btn btn-primary btn6 mr10" value="提交" type="button">
											<input class="btn btn6" onclick="history.go(-1)" value="返回" type="button">
									</td>
								</tr>
							</tbody>`
	}
	$('table').html(tr);
	$("#catid").find("option[value='"+data[0].type+"']").attr("selected",true); 
	$('#content').text(data[0].desc);
}




var uploaded = false //图片没有上传
		let OL_Action_Root = "http://127.0.0.1:3978"

		function Req_ajax() {

			console.log($("#imagelist")[0].files)
			var formData = new FormData() //创建
			console.log(formData)

			formData.append("test", $("#imagelist")[0].files[0])
			console.log(formData.get("test"))
			$.ajax({
				url: OL_Action_Root + '/api/book/img',
				type: 'POST',
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				success: function(data) {
					console.log(data)
					if (data.err == 0) {
						$('img').attr('src', 'http://127.0.0.1:3978/' + data.path)
						uploaded = data.path
						console.log(uploaded)
					}
				}
			});
		}
		
		
		
		$('table').on('click', '#filebtn',function() {
			Req_ajax();
		})
		
		
		function addbook() {
			
			
			
			
			 if (uploaded) {
			var bookdata = {
				time:new Date().toLocaleString('chinese', { hour12: false }),
				type:$("#catid option:selected").text(),
				title: $('#title').val(),
				writer: $('#writer').val(),
				img: uploaded,
				desc: $('#content').val(),
				id:id
			}
			console.log(bookdata)
			$.post(OL_Action_Root + "/api/book/updata", bookdata, function(res) {
				if (res.err == 0) {
					 // layer_close()
					 
					 alert('上传成功')
				} else {
					alert(res.msg)
				}
			})
			     	  }else{
						  var 	img = $('img').attr('src')
						  var bookdata = {
						  	time:new Date().toLocaleString('chinese', { hour12: false }),
						  	type:$("#catid option:selected").text(),
						  	title: $('#title').val(),
						  	writer: $('#writer').val(),
						  	img: img,
						  	desc: $('#content').val(),
						  	id:id
						  }
						  console.log(bookdata)
						  $.post(OL_Action_Root + "/api/book/updata", bookdata, function(res) {
						  	if (res.err == 0) {
						  		// layer_close()
						  		
						  		alert('上传成功')
						  	} else {
						  		alert(res.msg)
						  	}
						  })
						  		
						  
			      	  	 
			      	  }

		}
		
		
		
		$('table').on('click','#addbtn', addbook)



