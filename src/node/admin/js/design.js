// var mydate = new Date();  
// 获取指定时间格式
//  var onedate = new Date().toLocaleString('chinese', { hour12: false });
// 
// 
var name = getCookie('a');
console.log(name);
if (name != "undefined") {
	$('#users').html('<a href="">' + name + '</a>')
} else {
	$('#users').html('<a href="#">管理员</a>');

}


$('#quit').on('click', function() {
	console.log(123);
	setCookie('a', '', -1, '/');
	self.location = 'login.html';
});

let OL_Action_Root = "http://127.0.0.1:3978/"


let rootapi = 'http://localhost:3978/'




let total = 0;
let pageSize = 5;
let allPage = 0;
let nowPage = 1;
// let rootapi='http://localhost:3978/'
//切记存相对路径
// 获取food数据的封装
function goPage(type) {
	var targetPage = 1;

	switch (type) {
		case 'prev':
			targetPage = nowPage > 1 ? nowPage - 1 : 1

			break;
		case 'next':
			if (nowPage < allPage) {
				targetPage = nowPage + 1
			} else {
				targetPage = allPage
				alert('没有更多了哟')
			}
			break;
		case 'first':
			targetPage = 1

			break;
		case 'last':
			targetPage = allPage
			break;
		case 'jump':
			targetPage = $('#jump').val()
			if (targetPage <= allPage) {


			} else {
				targetPage = allPage
				alert('没有更多了哟')
			}
			break;
	}

	nowPage = targetPage
	getbookList(nowPage);

}

getbookList(nowPage);

function getbookList(page) {
	console.log(page)

	var search = $('#chaxun').val()
	var options = $("#catid option:selected").text();
	console.log(options)
	$.post(rootapi + 'api/book/find', {
		target: page,
		search: search,
		type: options,
		pagesize: pageSize
	}, function(res) {
		console.log(res)
		if (res.err == 0) {
			loadingTbody(res.data.booklist);
			$('#ttal').text('共' + res.data.total + '条')
			total = res.data.total
			allPage = Math.ceil(total / pageSize)

			$('#gjy').text(`${nowPage}/${allPage}页`)

		} else {
			alert(res.msg)

		}
	}, 'json')

}



function loadingTbody(data) {
	var allString = '';
	var str =
	    ` <tr>
				<th class="tc" width="5%"><input class="allChoose" name="" type="checkbox"></th>
				<!--<th>排序</th>-->
				<th>类型</th>
				<th>标题</th>
				<th>IMG</th>
				<!-- <th>点击</th> -->
				<th>发布人</th>
				<th>更新时间</th>
				 <th>评论</th> 
				<th>操作</th>
		</tr>`;
	for (var i = 0; i < data.length; i++) {
		var tr =
			`
	     <tr>
	     		<td class="tc"><input name="id[]" value="58" type="checkbox"></td>
	     		<td>${data[i].type}</td>
	     		<td>
	     		<a target="_blank" href="#" title="111">${data[i].title}</a>
	     		</td>
	     		<td><img  src="http://127.0.0.1:3978${data[i].img}"/></td>
	     		<td>${data[i].writer}</td>
	     		<td>${data[i].time}</td>
	     		<td>${data[i].desc}</td>
	     		<td>
	     			<a class="link-update" class="updata" onClick="updata('${data[i]._id}')" href="#">修改</a>
	     			<a class="link-del" onClick="delbook(this,'${data[i]._id}')" href="#">删除</a>
	     			
	     		</td>。
	     	</tr> `
		allString += tr;
	}
	$('#zp').html(str + allString);
}



function delbook(obj, id) {

	if (confirm("确定要删除数据吗？")) {
		$.post(OL_Action_Root + "api/book/delbook", {
			id: id
		}, function(res) {
			console.log(res)
			if (res.err == 0) {
				// layer_close()
				$(obj).parents("tr").remove();
				goPage(nowPage)
				alert('删除成功！！')
			} else {
				alert(res.msg)
			}
		})
	}
}


$("#catid").on('change', function() {

	goPage();
})

$("#search").click(function() {

	goPage();

})

function updata(_id) {
	console.log(_id);
	//获取id,然后在它的网址后面拼接一个id,使它能够跳转到相应的详情页
	location.href = "updata.html?id=" + _id;
}



$('#zp').on('click', '.updata', function(_id) {

	//alert(123);
	// var gid = $(this).attr('_id'); //添加自定义属性
	console.log(_id);
	//获取id,然后在它的网址后面拼接一个id,使它能够跳转到相应的详情页
	location.href = "detail.html?id=" + _id;

});
