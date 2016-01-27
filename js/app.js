window.sr = new scrollReveal({mobile: false});

$(document).foundation('offcanvas', 'reflow');
$(document).foundation('dropdown', 'reflow');
$(document).foundation('tab', 'reflow');
$(document).foundation('clearing', 'reflow');

$(document).foundation();

window.location = "#";

function safeString(obj) {
  return obj ? obj+'' : '';
}

function ownClasses(el) {
  var classes = $(el).attr('class').match(/(^|[^-\w])(?:off-canvas-\w*)/g);

  // Remove extra spaces
  if (!!classes) {
    classes = classes.map(function(el){ return el.replace(/\s+/g, '');})
  }
  return classes;
}

function ownClassesAsString(el) {
  classes = ownClasses(el);
  if (classes && classes.constructor === Array) {
    return classes.join(' ');
  }
  return classes;
}

function diffArray(a, b) {
  var seen = [], diff = [];
  for ( var i = 0; i < b.length; i++)
      seen[b[i]] = true;
  for ( var i = 0; i < a.length; i++)
      if (!seen[a[i]])
          diff.push(a[i]);
  return diff;
}

$(document).ready(function(){

  $(window).resize(function(){
    location.reload();
  });

  autosize(document.querySelectorAll('textarea'));

  if($('#fullpage').length>0) {
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
  };

  if($('.screen-slider').length>0) {
    $('.screen-slider').slick({
      vertical: true,
      arrows: false
    });
  };
  
  $(".feature-list li").click(function(e){
    var slideIndex = $(this).index();
    $(".screen-slider").slick('slickGoTo', parseInt(slideIndex));
    $('.screen-slider').on('setPosition', function(){
      var currentSlide = $('.screen-slider').slick('slickCurrentSlide') + 1;
      $(".feature-list li span").removeClass("active");
      $(".feature-list li:nth-child("+currentSlide+") span").addClass("active");
    });
  });

  if($('.questions').length>0) {
    $('.questions').slick({
      vertical: true,
      slidesToShow: 3,
      slidesToScroll: 1
    });
  };

  $('a[data-template], p[data-template]').click(function() {
    $('.exit-off-canvas').addClass('width');
    // Replace aside html with  template
    var templateName = $(this).data( "template" );
    var  $template = $('#' + templateName);

    var wrapClass = safeString($template.data( "wrap-class" ));

    // Replace aside html with  template
    $('.right-off-canvas-menu').html($template.html());

    // Cleanup previous wrap classes and add new
    $('.right-off-canvas-menu, .inner-wrap').each(function(_, el) {
      var $el = $(el),
        classes = ownClassesAsString(el);

      $el.toggleClass(safeString(classes) + ' ' + wrapClass);
    });

    $('header, footer, .exit-off-canvas, #fp-nav').each(function(_, el){
      $(el).toggleClass(wrapClass);
    });

    // Show offside menu
    $('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-left');
  });

  $('.exit-off-canvas').click(function(){
    selfClasses = ownClasses(this);
    allClasses = $(this).attr('class').split(' ');
    origClasses = diffArray(allClasses, selfClasses);
    offClasses = diffArray(allClasses, origClasses).join(' ')
    $('.exit-off-canvas').removeClass('width');
    $('header, footer, .exit-off-canvas, #fp-nav').toggleClass(offClasses);
  });
});

jQuery(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
  if($('#fullpage').length>0) {
    var active_section = $('#fullpage').find('div.section.active');
    $('aside' ).css('top', (active_section.prev().length > 0 ? $(window).height() + active_section.prev().offset().top : 0));
  };
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
