// join.js
var header = $("meta[name='_csrf_header']").attr('content');
var token = $("meta[name='_csrf']").attr('content');

$(function(){
//다른 페이지에서 슬라이드 메뉴 클릭 시 해당 컨텐츠로 이동을 위해 데이터 받기	
    var urlParams = new URLSearchParams(window.location.search);
    var pageScroll = urlParams.get('pageScroll');
    goToSlide(pageScroll);
});





//다른 페이지에서 슬라이드 메뉴 클릭 시 해당 컨텐츠로 이동
function goToSlide(pageScroll) {
	if(pageScroll!=null){
		var pickSlide = $('[name="'+pageScroll+'"]').first();
		slideEvent(pickSlide[0]);
	}
}

//다른 페이지에서 슬라이드 메뉴 클릭 시 해당 컨텐츠로 이동
function slideEvent(element) {
	var name = $(element).attr("name");
    $(".pick").removeClass("pick");	
	$(element).addClass("pick");
	swiper.slideTo(name)
}