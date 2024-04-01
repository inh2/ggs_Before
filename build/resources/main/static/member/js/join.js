// join.js
var header = $("meta[name='_csrf_header']").attr('content');
var token = $("meta[name='_csrf']").attr('content');

$(function(){

});

//onblur !null&!duplication일 때 다른 인풋 선택 가능
function NullCheck(element) {
   var checks = $(element).attr('id');

    var inputValue = document.getElementById(checks).value;

   if(inputValue ==''){         
      $(element).nextAll('div:first').next('div').css("display", "block");
   }else{
      if(checks=='password2'||checks=='password1'){
         if($('#password2').val() !== $('#password1').val()){
            $(element).nextAll('div:first').addClass( 'x' );			 
            $(element).nextAll('div:first').css("display", "block");            
         }else{
            $(element).nextAll('div:first').removeClass( 'x' );     			 
            $(element).nextAll('div:first').css("display", "none");   
         }   
      }         
      $(element).nextAll('div:first').next('div').css("display", "none");
   }
}

//실시간 중복체크   
function check(element){
   var inputed = $(element).val();
   var checks = $(element).attr('id');
   if(checks=="emailForm"|| checks=="customEmail" ||checks=="email"){
      inputed =  $('#email').val() + "@" + $('#customEmail').val();
   }   
    $.ajax({
      type: 'POST',
        data : {
            "checks" : checks,
            "value" : inputed
        },
        url : "/member/checking",
        beforeSend: function(xhr){
             xhr.setRequestHeader(header, token);
       },
        success : function(json) {
         if(json=="1"){
		        
            $(element).nextAll('div:first').addClass( 'x' );
            $(element).nextAll('div:first').css("display", "block");

         }else{
		 	
            $(element).nextAll('div:first').removeClass( 'x' );                  
            $(element).nextAll('div:first').css("display", "none");
         }   
        },
        error: function() {
        console.log("error");
         },
    });      
}

//중복, null체크 후 검증완료데이터만 전송
function join(){   

var nullId = $('#id').val();
var nullPw1 = $('#password1').val();
var nullPw2 = $('#password2').val();
var nullNick = $('#nick').val();
var nullName = $('#name').val();
var nullPhone = document.getElementById("phone1").value + document.getElementById("phone2").value + document.getElementById("phone3").value
var nullEmail = $('#email').val();
var emailForm = $('#customEmail').val()
var Email = $('#email').val() + "@" + emailForm;   
   
   if(nullId!==""&& nullPw1!=="" && nullPw2!=="" && nullNick!=="" && nullName!=="" && nullEmail!=="" && emailForm!==""){      
      var duplicatePw = $('#npw').attr("class");
      var duplicateId = $('#nid').attr("class");
      var duplicateNick = $('#nnick').attr("class");
      var duplicateEmail = $('#nemail').attr("class");
      var emailResult = $('#Confirm').val();

      
        if(duplicatePw=="x" || duplicateId=="x"|| duplicateNick=="x" || duplicateEmail=="x" || emailResult=="0"){
          alert("유효하지 않은 값이 있습니다.");
      }else if( emailResult=="" ){
         alert("이메일 인증이 완료되지 않았습니다.")
      }else{
          $.ajax({
            type: 'POST',
              data : {
                  "id" : nullId,
                  "pw" : nullPw2,
                  "name" : nullName,
                  "phone" : phone,
                  "nick" : nullNick,
                  "email" : Email
              },
              url : "/member/join",
              beforeSend: function(xhr){
                   xhr.setRequestHeader(header, token);
             },
              success : function(json) {
               window.location.replace("/member/login");
              },
              error: function() {
              console.log("error");
               },
          });            
      }
    }else{
      alert("빈값있음")
   }; 
};

// 이메일 폼 만들기, 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function() {
    updateInputValue();
});

function updateInputValue() {
    var selectBox = document.getElementById("emailForm");
    var inputField = document.getElementById("customEmail");

    // 선택된 옵션의 값을 가져옴
    var selectedOption = selectBox.value;

    // 선택된 옵션이 "직접입력"이 아닌 경우에는 인풋에 해당 옵션의 값을 나타냄
    if (selectedOption !== "") {
        inputField.value = selectedOption;
        check(selectBox);
    } else {
        // 선택된 옵션이 "직접입력"인 경우에는 인풋을 비움
        inputField.value = "";
        
    }

    // 인풋을 표시 또는 숨김
    inputField.style.display = "inline-block";
}


//이메일 인증
let emailresult = 0
function sendNumber(){
var emailForm = $('#customEmail').val()
var Email = $('#email').val() + "@" + emailForm;
   if($('#nemail').attr('class')=="x"||$('#email').val()==""){
      alert("이메일을 다시 확인해주세요");
   }else{      
       $("#mail_number").css("display","block");
       $.ajax({
           url:"/mail",
           type:"post",
           dataType:"json",
           data:{"mail" : Email},
           success: function(data){
               alert("인증번호 발송");
            emailresult = data;
           },
           error:function(){
            alert("이메일 양식이 아닙니다. 확인하세요");
         }
           }
          
       )};
}

function confirmNumber(){
    var number1 = $("#number").val();
   var rs =0;
    if(number1 == emailresult && number1!==""){
      rs = "1";
      $("#Confirm").attr("value",rs);
      alert("인증성공");
    }else{
      rs = "0";
      $("#Confirm").attr("value",rs);
      alert("인증실패");      
    }
}
   