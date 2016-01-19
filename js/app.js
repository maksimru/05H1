$(document).foundation('offcanvas', 'reflow');
$(document).foundation('dropdown', 'reflow');

$(document).foundation();

window.sr = new scrollReveal({ mobile: false });

window.location = "#"

function safeString(obj) {
  return obj ? obj+'' : '';
}

$(document).ready(function(){

  $(window).resize(function(){
    location.reload();
  });

  $('#fullpage').fullpage({
    'verticalCentered': false,
    navigation: true,
    scrollBar: true,
    onLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex){
          var leavingSlide = $(this);
          var windowHeight = $(window).height();
          $('aside').css('top', windowHeight + leavingSlide.offset().top);
      }
  });

  $("#fp-nav").prependTo(".wrapper");

  $('.screen-slider').slick({
    vertical: true,
    arrows: false
  });

  $(".feature-list li").click(function(e){
    var slideIndex = $(this).index();
    $(".screen-slider").slick('slickGoTo', parseInt(slideIndex));
    $('.screen-slider').on('setPosition', function(){
      var currentSlide = $('.screen-slider').slick('slickCurrentSlide') + 1;
      $(".feature-list li span").removeClass("active");
      $(".feature-list li:nth-child("+currentSlide+") span").addClass("active");
    });
  });

  $('.questions').slick({
    vertical: true,
    slidesToShow: 3,
    slidesToScroll: 1
  });

  $('a[data-template], p[data-template]').click(function() {
    // Replace aside html with  template
    var templateName = $(this).data( "template" );
    var  $template = $('#' + templateName);
    var cssClass = safeString($template.data( "wrap-class" ));

    // $.fn.fullpage({
    //   normalScrollElements: true
    // });

    // $('#fn-nav').hide();

    // Replace aside html with  template
    $('.right-off-canvas-menu').html($template.html());

    // Cleanup previous css classes and add new
    $('.right-off-canvas-menu, .inner-wrap').each(function(_, el) {
      var $el = $(el),
        classes = $(el).attr('class').match(/(^|[^-\w])(?:off-canvas-\w*)/g);

      if (!!classes) {
        classes = classes.join(' ');
      }
      $el.toggleClass(safeString(classes) + ' ' + cssClass);
    });

    // Show offside menu
    $('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-left');
  });
});

jQuery(document).ready(function($) {
  $(window).load(function(){
    $('#preloader').fadeOut('20000',function(){$(this).remove();});
  });
});

jQuery(document).ready(function($) {
  $(".off-canvas-submenu").hide();
  $("body").on("click", "a.off-canvas-submenu-call", function() {
    // var icon = $(this).parent().next(".off-canvas-submenu").is(':visible') ? '+' : '-';
    $(this).parent().next(".off-canvas-submenu").slideToggle('fast');
    $(this).find("span > i").toggleClass("fa-angle-down fa-angle-up");
  });
});

