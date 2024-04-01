// join.js
var header = $("meta[name='_csrf_header']").attr('content');
var token = $("meta[name='_csrf']").attr('content');

$(function(){

});

//패스워드 수정폼 토글
function modifyPw(){
    $(".modifyPwForm").toggle();
}

//닉네임 수정폼 토글
function modifyNick(){
    $(".modifyNickForm").toggle();
}