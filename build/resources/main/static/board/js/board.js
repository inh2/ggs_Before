// // 필수로 필요함 인혁아 정신차려라
// var header = $("meta[name='_csrf_header']").attr('content');
// var token = $("meta[name='_csrf']").attr('content');

// function prepareEditorContent(){
//     var title = $("#title").val();
//     var nickname = $("#nickname").val();
//     var detail = window.editor.getHTML();
// $.ajax({
//     type: 'POST',
//     url: "/board/board_write",
//     data: {
//         "title": title,
//         "nickname": nickname,
//         "detail": detail
//     },
//     contentType: "application/json",
//     beforeSend: function (xhr) {
//         xhr.setRequestHeader(header, token);
//     },
//     success: function (data) {
//         console.log(data);


//     },
//     error: function () {
//         console.log("로그인 해라 값을 넣던가");
//     },
// });

// }

// 필수로 필요함 인혁아 정신차려라
var header = $("meta[name='_csrf_header']").attr('content');
var token = $("meta[name='_csrf']").attr('content');

function prepareEditorContent(){
    var title = $("#title").val();
    var nickname = $("#nickname").val();
    var detail = window.editor.getHTML();
    console.log(detail);

		    $.ajax({
				type: 'POST',
		        data : {
			        "title": title,
			        "nickname": nickname,
			        "detail": detail
		        },
		        url : "/board/board_write",
		        beforeSend: function(xhr){
		  			  xhr.setRequestHeader(header, token);
				 },
		        success : function(json) {
					alert(json)
		        },
		        error: function() {
					alert("잠시 후 다시 시도하세요.")
		      	},
		    });

}
