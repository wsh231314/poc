$(document).ready(function() {

	var url = $("#ctx").val() + "/tables";
	$('#example').DataTable({
		"ajax" : url,
		"pagingType": "simple_numbers",//设置分页控件的模式 
		"iDisplayLength" : 10,// 每页显示行数
		"bLengthChange": false,//屏蔽tables的一页展示多少条记录的下拉列表
//		"bFilter" : true,// 搜索栏
		"processing": true, //打开数据加载时的等待效果
		"bStateSave":true,
//		"serverSide": true,
//		"ajax": {
//            "url": url,
//            "type":"POST"
//        },
		"columns" : [ {
			"data" : "id"
		},
		{
			"data" : "category_name"
		}, {
			"data" : "date"
		}, {
			"data" : "amount"
		}, {
			"data" : "image_name"
		}, {
			"data" : "status"
		}, {
			"data" : "location"
		} , {
			"sClass": "text-center",
			"data": "id",
			"render": function (data, type, full, meta) {
                return '<input type="button"  value="delete" class="btn btn-primary"   onclick="deleteR(' + data + ')" />';
            },
            "bSortable": false,
			"searchable" : false
		}, 
		{ 
			"sClass": "text-center",
			"data": "id",
			"render": function (data, type, full, meta) {
                return '<input type="button"  value="modify" class="btn btn-primary"   onclick="updateR(' + data + ')" />';
            },
            "bSortable": false,
			"searchable" : false
		},
		
		],
		"columnDefs" : [ {
			"targets" : [ 0 ],
			"visible" : false,
			"searchable" : false
		} ]
	});

	$('#uploadmulti').on('click', function() {
		$("#messageE").text(""); 
		var uploadFlg = true;
		if (window.File && window.FileList) {
			var files = $('#multipleFiles')[0].files;
			console.log(files.length);
			var file;
			for (var i = 0; i < files.length; i++) {
				// file对象为用户选择的某一个文件
				file = files[i];
				// 此时取出这个文件进行处理，这里只是显示文件名
				console.log(file.name);
				if (checkImgType(file.name)) {
					uploadFlg = false;
				}
			}
		} else {
			console.log("抱歉，你的浏览器不支持FileAPI，请升级浏览器！");
		}
		return uploadFlg;
	});
	
	
});

function download() {
	var pno = $("#pno").val();
	var url = $("#ctx").val() + "/download?pno=" + pno;
	window.open(url);
}

function runScript() {
	$("body").mLoading("show");//显示loading组件
	var urlD = $("#ctx").val() + "/run";
	$.ajax({
		type : "GET",
		url : urlD,
		success : function (data) {

			$("body").mLoading("hide");//隐藏loading组件
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {

			$("body").mLoading("hide");//隐藏loading组件
			console.log(errorThrown);
		}
	});
}

/*
 * 判断图片类型
 * 
 * @param ths type="file"的javascript对象 @return true-符合要求,false-不符合
 */
function checkImgType(fileName) {
	if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileName)) {
		$("#messageE").text(fileName + " type must be one of Gif, JPEG, JPG, or png"); 
		return true;
	}
	return false;
}

function deleteR(id) {
	var urlD = $("#ctx").val() + "/delete?id=" + id;
	var urlList = $("#ctx").val() + "/list";
	$.ajax({
		type : "GET",
		url : urlD,
		dataType : "json",
		success : function (data) {
			window.location.href = urlList;
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});
}

function updateR(id) {
if (id) {
	var compareUrl = $("#ctx").val() + "/detail?id=";
	window.location.href = compareUrl + id;
}
}

