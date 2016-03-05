$(document).ready(function(){
    $('#page-top').css({height: $(window).height() - $('#navbar-id').height()});
});

function(event) {
  var $anchor = $(this);
  $('html, body').stop().animate({
    scrollTop: $($anchor.attr('href')).offset().top
  }, 1500, 'easeInOutExpo');
  event.preventDefault();
}
