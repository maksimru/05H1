window.sr = new scrollReveal({mobile: false});

$(document).foundation('offcanvas', 'reflow');
$(document).foundation('dropdown', 'reflow');

$(document).foundation();

window.location = "#";

function safeString(obj) {
  return obj ? obj+'' : '';
}

$(document).ready(function(){

  $(window).resize(function(){
    location.reload();
  });

  $('#fullpage').fullpage({
    verticalCentered: false,
    navigation: true,
    scrollBar: true,
    onLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex){
          //disable scroll slides with opened menu
          if($("div.off-canvas-wrap").hasClass('move-left'))
              return false;
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

jQuery(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
    var active_section = $("#fullpage").find("div.section.active");
    var wrapper_position = $(".inner-wrap").getAbsolute();
    //top positioned
    $("header,#fp-nav").each(function (i, o) {
        $(o).data('old_top', $(o).position().top);
        $(o).data('old_left', $(o).position().left);
        $(o).css('top', $(o).position().top + wrapper_position.top + 'px');
        $(o).css('left', $(o).position().left + wrapper_position.left + 'px');
    });
    //bottom positioned
    $("footer").each(function (i, o) {
        $(o).data('old_bottom', $(o).css('bottom'));
        $(o).data('old_left', $(o).position().left);
        $(o).css('top', $(o).position().top + wrapper_position.top + 'px');
        $(o).css('left', $(o).position().left + wrapper_position.left + 'px');
    });
    $('aside').css('top', (active_section.prev().length > 0 ? $(window).height() + active_section.prev().offset().top : 0));
    $("#fp-nav").hide();
});

jQuery(document).on('close.fndtn.offcanvas', '[data-offcanvas]', function () {
    //top positioned
    $("header,#fp-nav").each(function (i, o) {
        $(o).css('top', $(o).data('old_top') + 'px');
        $(o).css('left', $(o).data('old_left') + 'px');
    });
    //bottom positioned
    $("footer").each(function (i, o) {
        $(o).css('top', 'auto');
        $(o).css('bottom', $(o).data('old_bottom') + 'px');
        $(o).css('left', $(o).data('old_left') + 'px');
    });
    $("#fp-nav").show();
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

