// join.js
var header = $("meta[name='_csrf_header']").attr('content');
var token = $("meta[name='_csrf']").attr('content');

$(function(){

});

$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
    if (jqxhr.status === 401 ) {
        // Handle 401 Unauthorized response, e.g., show a modal or notification
        window.location.replace("/member/login");
        
    }
});