/**
 * Theme Name: Grona Landings
 * Author: Grona Studio
 * Author URI: https://grona.dev
 * Description: Multipurpose templates and UI Kit
 * Version: 1
 */

/**
 * Check touch device
 */
function is_touch_device() {
  return 'ontouchstart' in window        // works on most browsers
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

/**
 * scroll function
 */
$(function() {
  $(document).on('click', "a.smooth", function (e) {
    e.preventDefault();
    $offset = $(this).data('offset');
    if(!$offset){ $offset = 0 }
		$(document).off("scroll");
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      var targetHash = this.hash;
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').stop().animate({
          'scrollTop': target.offset().top - $offset
        }, 500, 'swing', function () {
          window.location.hash = targetHash;
          $(document).on("scroll", onScroll);
        });
      }
    }
  });
});

/**
 * on scroll function : add class active when scroll reach to element ID
 */
function onScroll(event){
  var scrollPos = $(document).scrollTop();
  $('a.activeOnScroll').each(function () {
    var currLink = $(this);
    var refElement_id = $(this).attr("href");
    var refElement = $(refElement_id);
    if ( (refElement.offset().top <= scrollPos ) && ( refElement.offset().top + refElement.height() > scrollPos ) ) {
      $('a.activeOnScroll').parent().removeClass("active");
      currLink.parent().addClass("active");
    }
  });
}
$(document).on("scroll", onScroll);
/**
 * go top button
 */
$(function() {
  $(document).on('click', ".gotop,.goup", function () {
    var body = $("html, body");
    body.stop().animate({scrollTop:0}, 500, 'swing', function() {
    });
  });
});

/**
 * scroll functions
 */
$(window).scroll(function() {

  /**
   * fixed header position : based scrollTop 74
   */
	if ( $(window).scrollTop() >= 74 ) {
		$('.header-sticky').addClass('fixed-top');
	} else {
		$('.header-sticky').removeClass('fixed-top');
  }

  /**
   * goup menu & sticky bottom menu : based scrollTop 600
   */
	if ( $(window).scrollTop() >= 600 ) {
    $('.goup').addClass('showup');

    /* show sticky bottom navbar if header ment not triggered */
    if( !$('.header').hasClass('header-menu-shown') ) {
      $('.navbar-bottom-onMobile').addClass('navbar-bottom-show');
    }

	} else {
    $('.goup').removeClass('showup');

    /* hide sticky bottom navbar if scroll to top happend */
    if($('.navbar-bottom-onMobile').hasClass('navbar-bottom-show')) {
      /* hide sticky bottom navbar */
      $('.navbar-bottom-onMobile').removeClass('navbar-bottom-show');
      /* remove all popups on mobile if scroll to top happend for any reason */
      $('.header').removeClass('header-menu-shown');
      $('.back-link').trigger('click');
    }

	}
});

/**
 * trigger on show modal
 */
$('.modal').on('show.bs.modal', function (event) {
  $('.goup').removeClass('showup');
	$('.navbar-bottom-onMobile').removeClass('navbar-bottom-show');
})

/**
 * lazy load init
 */
$(function () {
	var imgLoad = new LazyLoad({
		class_loading: 'loading_src'
	});
	var backLoad = new LazyLoad({
		elements_selector: ".lazy-back",
	});
}());

/**
 * sidebar function
 */
$('.has-dropdown .sidebar-menu-link').on('click', function(e){
    e.preventDefault();
    $parent = $(this).parent();
    if($parent.hasClass('show')){
        $parent.removeClass('show')
    } else {
        $('.has-dropdown').removeClass('show');
        $parent.addClass('show')
    }
});

/**
 * sliders and carousels init function
 */

/**
 * box Carousel
 */
$(function() {
  var $box_carousel = $('.box-carousel');
  $box_carousel.on('init', function () {
    $(this).css({
      height: 'auto',
      visibility: 'visible'
    });
  });
  $box_carousel.slick({
      dots: false,
      nav:false,
      speed: 300,
      rows:2,
      loop:false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },{
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          }
        }

      ],
  });
});
/**
 * demo Carousel
 */
$(function() {
  var $demos_carousel = $('.demos-carousel');
  $demos_carousel.on('init', function (slick) {
    $(this).css({
      height: 'auto',
      visibility: 'visible'
    });
  });
  $demos_carousel.slick({
      dots: false,
      nav:false,
      infinite: false,
      speed: 300,
      centerMode: true,
      prevArrow: '.carousel-demos-prev',
		  nextArrow: '.carousel-demos-next',
      centerPadding: '0px',
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          }
        },{
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          }
        }

      ],
  })
  .on('setPosition', function (event, slick) {
    range_carousel($(this));
  })
  .on('afterChange', function(event, slick, currentSlide){
    var screen = $(slick.$slides.get(currentSlide)).find('img').attr('src');
    $('.macbook .screen .viewport').attr('data-src',screen).removeAttr('data-was-processed');
    new LazyLoad({ elements_selector: ".viewport.lazy-back"});
  });
  if($demos_carousel.length){
    var slick_demos_info = $demos_carousel.slick( "getSlick" );
    var demos_carousel_pageCount = slick_demos_info.getDotCount();
    $demos_carousel.slick('slickGoTo', (demos_carousel_pageCount/2));
    $(document).on({
      mouseenter: function () {
        $('.macbook .viewport').css('background-position','0 100%');
        $('.macbook .btn').css({
          'opacity' : 0,
          'transform' : 'scale(0.5)',
        });

      },
      mouseleave: function () {
        $('.macbook .viewport').css('background-position','0 0');
        $('.macbook .btn').css({
          'opacity' : 1,
          'transform' : 'scale(1)',
        });
      }
    }, ".demos-carousel .slick-center");
  }
});

/**
 * Portfolio Carousel
 */
$(function() {
  var $items_carousel = $('.portfolio-carousel,.shop-carousel');
  $items_carousel.on('init', function () {
    $(this).css({
      height: 'auto',
      visibility: 'visible'
    });
  });
  $items_carousel.slick({
    dots: false,
    nav:false,
    speed : 300,
    height: 320,
    infinite: false,
    prevArrow: '.carousel-navigation-custom-prev',
		nextArrow: '.carousel-navigation-custom-next',
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },{
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }

    ],
  })
  .on('setPosition', function (event, slick) {
    slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    range_carousel($(this));
  });
});

/**
 * Post Carousel
 */
$(function() {
  var $post_carousel = $('.post-carousel');
  var $post_carousel_control;
  $post_carousel.on('init', function () {
    $(this).css({
      height: 'auto',
      visibility: 'visible'
    });
  });
  $post_carousel.slick({
    dots: false,
    nav:false,
    speed : 300,
    height: 320,
    infinite: false,
    prevArrow: '.carousel-navigation-custom-prev',
		nextArrow: '.carousel-navigation-custom-next',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },{
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }

    ],
  })
  .on('setPosition', function (event, slick) {
    slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    range_carousel($(this));
  });
});

/**
 * Range slider Carousel Control
 */
function range_carousel($carousel) {
  $carousel_ID = $carousel.attr('id');
  var slick_info = $carousel.slick( "getSlick" );
  var pageCount = slick_info.getDotCount();
  var current_page = slick_info.currentSlide;
  $range_slider = $( '.slider-controller[data-carousel="'+$carousel_ID+'"]' );
  $carousel_control = $range_slider.slider({
    animate: "fast",
    min : 0,
    max : pageCount,
    slide: function(event, ui) {
      $carousel.slick( "goTo", ui.value );
    }
  });
  $range_slider.slider( "value", current_page );
}

/**
 * colorBox Carousel
 */
$(function() {
  var $colorBox_carousel = $('.color-box-carousel');
  $colorBox_carousel.on('init', function () {
    $(this).css({
      height: 'auto',
      visibility: 'visible'
    });
  });
  $colorBox_carousel.slick({
    dots: false,
    nav:false,
    speed : 300,
    centerMode: true,
    centerPadding: '0px',
    prevArrow: '.carousel-colorBox-prev',
		nextArrow: '.carousel-colorBox-next',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerPadding: '20%',
        }
      }

    ],
  });
});

/**
 * features icon Carousel
 */
$(function() {
  var $features_carousel = $('.features-carousel');
  $features_carousel.on('afterChange init', function(event, slick, direction){
    slick.$slides.removeClass('prevSlide').removeClass('nextSlide');
    for (var i = 0; i < slick.$slides.length; i++)
    {
        var $slide = $(slick.$slides[i]);
        if ($slide.hasClass('slick-current')) {
            $slide.prevAll().addClass('prevSlide');
            $slide.nextAll().addClass('nextSlide');
            break;
        }
    }
  })
  .on('beforeChange', function(event, slick) {
    slick.$slides.removeClass('prevSlide').removeClass('nextSlide');
  })
  .on('init', function () {
  $(this).css({
      height: 'auto',
      visibility: 'visible'
    });
  });
  $features_carousel.slick({
    dots: true,
    nav:false,
    speed : 300,
    centerMode: true,
    centerPadding: '0px',
    prevArrow: false,
		nextArrow: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }

    ],
  });
});

/**
 * logo Carousel
 */
$(function() {
  var $logo_carousel = $('.logo-carousel');
  $logo_carousel.on('init', function () {
    $(this).css({
      height: 'auto',
      visibility: 'visible'
    });
  });
  $logo_carousel.slick({
    dots: false,
    nav: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      }, {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        }
      }
    ],
  });
});

/**
 * slider items
 */
$(function() {
  var $slider_item = $('.slider-item');
  $slider_item.on('init', function () {
    $(this).css({
      height: 'auto',
      visibility: 'visible'
    });
  });
  $slider_item.slick({
    dots: true,
    nav:false,
    prevArrow: false,
		nextArrow: false,
    speed : 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
  });
});

/*-- shop features slider --*/
$(function() {
  var $product_features_slider = $('.product-featured-slider');
  $product_features_slider.on('init', function () {
    $(this).css({
      height: 'auto',
      visibility: 'visible'
    });
  });
  $product_features_slider.slick({
    dots: true,
    nav:false,
    prevArrow: false,
		nextArrow: false,
    speed : 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    autoplay: false,
  });

});
/*-- shop single slider --*/
$(function() {
  var $product_single_slider = $('.product-single-images');
  var $product_single_thumb = $('.product-single-thumbs');
  $('.product-single-images,.product-single-thumbs').on('init', function () {
    $(this).removeClass('loader').css({
      height: 'auto',
      visibility: 'visible'
    });
  });
  $product_single_slider.slick({
    dots: false,
    nav:false,
    prevArrow: false,
    nextArrow: false,
    infinite: false,
    speed : 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    asNavFor: '.product-single-thumbs'
  });
  $product_single_thumb.slick({
    dots: false,
    nav:false,
    prevArrow: false,
    nextArrow: false,
    infinite: true,
    speed : 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    focusOnSelect: true,
    centerMode:true,
    asNavFor: '.product-single-images',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        }
      }

    ],
  });

});

$(document).ready(function () {
  $('.mega-menu-side-nav li a').on('mouseenter', function(e){
    var dropdown = $(this).parents('.dropdown');
    dropdown.find('.mega-menu-side-nav li a').removeClass('active');
    $(this).addClass('active');
    var id = $(this).data('tab');
    dropdown.find('.mega-menu-content').removeClass('show');
    $('#'+id).addClass('show')
  });
  $('.mega-menu-side-nav li a').on("click", function(e){
    e.stopPropagation();
    e.preventDefault();

  });
});
$('.mega-menu-advanced-wrapper').on('shown.bs.dropdown', function () {
  if(!$('.mega-menu-back').length){
    $('body').append('<div class="mega-menu-back"></div>');
  }
  $('.header').addClass('show-hover-menu');
  if( !$('.header-menu-back').hasClass('show') ) {
    $('.mega-menu-back').addClass('show');
  }
  //focus on search field if exist
  setTimeout(function() { $('.search-advanced-fields input').focus() }, 500);
})
$('.mega-menu-advanced-wrapper').on('hide.bs.dropdown', function () {
  $('.mega-menu-back').removeClass('show');
  $('.header').removeClass('show-hover-menu');
});
$('.mega-menu-advanced,.user-menu').on("click", function(e){
  e.stopPropagation();
});
/*-- fixed position mega menu --*/
$('.mega-menu-wrapper').on('shown.bs.dropdown', function () {
  var $dropdown = $(this).find('.dropdown-menu');
  var right_offset = ($(window).width() - ($dropdown.offset().left + $dropdown.outerWidth()) - 15 );
  if(right_offset < 0) {
    $dropdown.css('margin-left',right_offset);
  }
})
$('.mega-menu-wrapper').on('hide.bs.dropdown', function () {
  var $dropdown = $(this).find('.dropdown-menu');
  $dropdown.css('margin-left','0');
})
/*--- hoverable dropdown --- */
if(!is_touch_device()){
  $('.dropdown-hover-toggle').on('click', function(e){
    $(this).dropdown('toggle');
  });
  $('.dropdown-hover-toggle').on('mouseenter', function(e){
    $('.dropdown > a').dropdown('hide');
    $(this).dropdown('show');
  });
  $('.dropdown-hoverable').on('mouseleave', function(e){
    $(this).find('.dropdown-hover-toggle').dropdown('hide');
  });
}
if(is_touch_device()){
  console.log('touch Device');
}
$('.submenu-link').on("click.bs.dropdown", function (e) {
  e.preventDefault();
  e.stopPropagation();
});
/*--- dropdown center align ---*/
$('.dropdown-menu-center').on('shown.bs.dropdown', function () {
  var width = ($(this).find('.dropdown-menu').outerWidth())/2;
  $(this).find('.dropdown-menu').css("margin-left",-width)
})
/*--- user menu ---*/
$('.user-menu-wrapper').on('shown.bs.dropdown', function () {
  $('.header').addClass('show-user-menu');
})
$('.user-menu-wrapper').on('hide.bs.dropdown', function () {
  $('.header').removeClass('show-user-menu');
});
$('.user-menu-wrapper [role="tab"]').on("click.bs.dropdown", function (e) {
  e.preventDefault();
  $('.user-menu-wrapper [role="tab"]').not(this).removeClass('active'); //bootstrap bug
  $(this).tab('show');
});
$('[role="tab"]').on('shown.bs.tab', function (e) {
  if (e.relatedTarget) {
    $(e.relatedTarget).removeClass('active');
  }

})


/*--- customer review ---*/
$('.testimonial-items a').on("click", function(e){

  $parent = $(this).parents('.testimonial-float');
  $customer = $(this);
  $review = $parent.find('.testimonial-floatbox-inner');

  //get old review
  $review_avatar = $review.find('img').attr('src');
  $review_name = $review.find('.testimonial-author').text();
  $review_post = $review.find('.testimonial-author-post').text();
  $review_comment = $review.find('.testimonial-text').text();

  //get new review
  $avatar = $customer.find('img').attr('src');
  $name = $customer.attr('data-authorname');
  $post = $customer.attr('data-authorpost');
  $comment = $customer.attr('data-comment');

  $review.addClass('fadeInUp');
  $customer.addClass('placed').siblings().removeClass('placed');

  //set new review
  $review.find('img').attr('src',$avatar);
  $review.find('.testimonial-author').text($name);
  $review.find('.testimonial-author-post').text($post);
  $review.find('.testimonial-text').text($comment);

  //set old review
  setTimeout(function() {
    $customer.find('img').attr('src',$review_avatar);
  }, 500);
  $customer.attr('data-authorname',$review_name)
  $customer.attr('title',$review_name)
  $customer.attr('data-authorpost',$review_post)
  $customer.attr('data-comment',$review_comment)

  setTimeout(function() {
    $review.removeClass('fadeInUp');
    $customer.removeClass('placed')
  }, 1500);
});

/*--- close dropdown ---*/
$('.dropdown-close').on("click.bs.dropdown", function (e) {
  $(this).parents('.dropdown').find('.dropdown-toggle').dropdown('hide');
});
/*--- menu toggle ---*/
$('.menu-toggle').on('click', function(e){
  $menu = $('.header-menu');
  if($menu.hasClass('show')){
      $('.header-menu-back').removeClass('show');
      $(this).removeClass('toggled');
      $('.header').removeClass('header-menu-shown');
      $menu.removeClass('show');
      $menu.removeClass('header-menu-fixed-bottom');
      $('body').removeClass('overflow-hidden');
      $('body').removeClass('header-sticked');
      $('body').removeClass('open-nav');

  } else {
      $('body').addClass('open-nav');
      if($(this).hasClass('navbar-button')){
        $('.navbar-buttons .navbar-button').removeClass('active');
        $menu.addClass('header-menu-fixed-bottom');
        $('body').addClass('overflow-hidden');
      }
      if(!$('.header-menu-back').length){
        $('body').append('<button type="button" class="header-menu-back"></button>');
      }
      $('.header-menu-back').addClass('show');
      $('.header').addClass('header-menu-shown');
      $(this).addClass('toggled');
      $('.dropdown-menu').removeClass('show');
      $('.sidebar').removeClass('show');
      $menu.addClass('show');
      if(is_touch_device() && $('header.header').hasClass('header-sticky')) {
        $('body').addClass('header-sticked');
      }
  }

});
$(document).on('click','.header-menu-back', function(e){
  $('.menu-toggle').removeClass('toggled');
  $('.header-menu').removeClass('show').removeClass('header-menu-fixed-bottom');
  $('.dropdown-menu').removeClass('show');
  $('.sidebar').removeClass('show');
  $(this).removeClass('show');
  $('body').removeClass('header-sticked').removeClass('overflow-hidden');
  $('body').removeClass('open-nav');
  $('.header').removeClass('header-menu-shown');
});
if(is_touch_device()){
  $('.user-menu-wrapper,.search-inline-item').on('shown.bs.dropdown', function () {
    $('.menu-toggle').removeClass('toggled');
    $('.header-menu').removeClass('show');
    $('.header-menu-back').removeClass('show');
    $('body').removeClass('header-sticked');
  })
}
function gr_form_init() {
  $('.gr-form-group input').each(function(){
    if ($(this).val()) { $(this).addClass('filled'); }
  })
	$('.gr-form-group input').on('keyup', function () { $(this).attr('value', this.value); });
	$('.gr-form-group input').on('blur', function () {
		if ($(this).val()) { $(this).addClass('filled'); } else { $(this).removeClass('filled'); }
	});
}
gr_form_init();
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
$('.step-item').on('click',function(e){
  $(this).addClass('active').siblings().removeClass('active');
  $(this).prevAll().addClass('done');
  $(this).nextAll().removeClass('done');
})

$('.step-item').on({
  mouseenter: function () {
    $(this).addClass('active').siblings().removeClass('active');
    $(this).prevAll().addClass('done');
    $(this).nextAll().removeClass('done');
  },
  mouseleave: function () {

  }
});
$('.step-item.active').prevAll().addClass('done');
/**
 * price table
**/
$('#pricePlanToggle').on('change',function(e){
  if ($(this).is(':checked')) {
    $('.price-table-item').attr('data-plan','yearly');
  } else {
    $('.price-table-item').attr('data-plan','monthly');
  }
})
$(document).ready(function() {
  var maxHeight = -1;

  $('.same-height').each(function() {
    maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
  });

  $('.same-height').each(function() {
    $(this).height(maxHeight);
  });
});
$('.post-item-like').on('click' , function(e){
  var like_button = $(this);
  like_button.toggleClass('liked');
});
$(function () {
  var step_count = $('.steps-list').children().length;
  $('.steps-list,.steps-tracker').css('min-width',step_count*150);
});
$(function () {
  if( $( window ).width() < 768 ) {
    var price_count = $('.price-table').children().length;
    $('.price-table').css('min-width',price_count*170);
  }
});
$(function () {

  $( '[data-fancybox]' ).fancybox({
    buttons: ["zoom","share","slideShow","fullScreen","download","thumbs","close"],
    caption : function( instance, item ) {
      var figcaption = $(this).find('.caption');
      if(figcaption.length) {
        return $(this).find('.caption').html();
      } else {
        return $(this).data('caption');
      }
    }
  });
  /*single product fancybox*/
  $thumb_axis = (is_touch_device()) ? 'x' : 'y';
  $('[data-fancybox="product_images"]').fancybox({
    infobar: false,
    buttons: false,
    arrows: true,
    margin: 0,
    animationEffect: false,
    touch: {
      vertical: false
    },
    transitionEffect: "slide",
    transitionDuration: 500,
    backFocus: false,
    thumbs : {
      autoStart   : true,
      hideOnClose : true,
      axis : $thumb_axis,
      parentEl: ".fancybox-modal",
    },
    baseClass: "product-fancybox",
    // Base template for product Modal
    baseTpl:
    '<div class="fancybox-container" role="dialog" tabindex="-1">' +
    '<div class="fancybox-bg"></div>' +
    '<div class="fancybox-inner fancybox-modal">' +
    '<button type="button" class="fancybox-close"><i class="icon-delete"></i></button>' +
    '<div class="fancybox-stage"></div>' +
    "</div>" +
    "</div>",

    afterLoad: function(instance) {
      if(!is_touch_device()) {
        $('.product-fancybox .fancybox-thumbs__list').addClass('scrollbar-inner scrollbar-horizontal').scrollbar(
          {
            showArrows: true,
            scrollStep: 150,
            scrolly: "advanced",
            "onScroll": function(y, x){
              if(y.scroll > (y.maxScroll - 1)){
                $('.scroll-arrow.scroll-arrow_more').addClass('disabled');
              } else {
                $('.scroll-arrow.scroll-arrow_more').removeClass('disabled');
              }
              if(y.scroll == 0){
                $('.scroll-arrow.scroll-arrow_less').addClass('disabled');
              } else {
                $('.scroll-arrow.scroll-arrow_less').removeClass('disabled');
              }
            }
          }
        );
      }
    }
  });
  $('[data-fancybox="product_detail_imgs"]').fancybox({
    infobar: false,
    buttons: false,
    arrows: false,
    margin: 0,

    thumbs : {
      autoStart   : false,
    },
    baseClass: "product-img-fancybox",
  });
  $(document).on('click','.fancybox-close', function(){
    $.fancybox.close();
  });
});
$('.nav-list .nav-link').on('click',function(e){
  e.preventDefault();
  var $parent = $(this).parents('.nav-list');
  $parent.find('.nav-link').removeClass('active');
  $(this).addClass('active');
  $('.has-ajax-filtering').addClass('loader-progress');
  setTimeout(function() {
    $('.has-ajax-filtering').removeClass('loader-progress');
  }, 2000);
  console.log('sample function to filter action');
})

$screenshot_items = $('.screenshot-items .item');
$screenshot_items_length = $screenshot_items.length;
if($screenshot_items_length){
  $count_shot = 1;
  $scale = 1;
  $screenshot_items.each(function(item){
    $offset_shot = $count_shot * 50;
    $scale = $scale - ($scale * $count_shot * 2 / 100 );
    $(this).css('left',$offset_shot);
    $(this).css('z-index',$screenshot_items_length-$count_shot+1);
    $(this).css('transform','scale('+$scale+')');
    $count_shot++;
  });
  $('.screenshot-items').css('visibility','visible')
}
function frameIt(item) {
	var item = $(item);
	var item_img = item.find('img');
	var src_new = item_img.attr('src');
	var frame = $('.screenshot-frame-inner');
	var current_frame_src = frame.find('img').attr('src');

	item.addClass('selected').siblings().removeClass('selected');
	setTimeout(function () {
		item_img.attr('src', current_frame_src);
		frame.find('img').fadeOut(50, function () {
			frame.find('img').attr('src', src_new);
		}).fadeIn(200);
	 }, 200);
}
/*
  Product quick view
  =====================================
*/
$(function() {
  $(".quick_view").fancybox({
    baseClass: "quick-view-container",
    infobar: false,
    buttons: false,
    thumbs: false,
    margin: 0,
    touch: {
      vertical: false
    },
    animationEffect: false,
    transitionEffect: "slide",
    transitionDuration: 500,
    baseTpl:
      '<div class="fancybox-container" role="dialog">' +
      '<div class="quick-view-content">' +
      '<div class="quick-view-carousel">' +
      '<div class="fancybox-stage"></div>' +
      "</div>" +
      '<div class="quick-view-aside"></div>' +
      '<button data-fancybox-close class="quick-view-close">X</button>' +
      "</div>" +
      "</div>",

    onInit: function(instance) {
      /*

			    #1 Create bullet navigation links
			    =================================

      */
      var bullet_count = instance.group.length;
      if(bullet_count > 1) {
        var bullets = '<ul class="quick-view-bullets">';

        for (var i = 0; i < bullet_count; i++) {
          bullets += '<li><a data-index="' + i + '" href="javascript:;"><span>' + (i + 1) + "</span></a></li>";
        }

        bullets += "</ul>";

        $(bullets)
          .on("click touchstart", "a", function() {
            var index = $(this).data("index");

            $.fancybox.getInstance(function() {
              this.jumpTo(index);
            });
          })
          .appendTo(instance.$refs.container.find(".quick-view-carousel"));
      }


      /*

			    #2 Add product form
			    ===================

			*/

      var $element = instance.group[instance.currIndex].opts.$orig;
      var form_id = $element.data("qw-form");

      instance.$refs.container.find(".quick-view-aside").append(
        // In this example, this element contains the form
        $("#" + form_id)
          .clone(true)
          .removeClass("d-none")
      );
    },

    beforeShow: function(instance) {
      /*
			    Mark current bullet navigation link as active
			*/
      $('.navbar-bottom-onMobile').addClass('navbar-bottom-hide');
      instance.$refs.container
        .find(".quick-view-bullets")
        .children()
        .removeClass("active")
        .eq(instance.currIndex)
        .addClass("active");
    },
    afterLoad: function(instance) {
      instance.$refs.container
        .find(".product-content-body")
        .addClass('scrollbar-inner visible-on-hover')
        .scrollbar()
        .find('input[type="radio"]:first').prop( "checked", true )

    },
    afterClose: function(instance) {
      $('.navbar-bottom-onMobile').removeClass('navbar-bottom-hide');
    }
  });
});
$('.content-expand-toggle').on('click',function(e){
  $(this).parent().toggleClass('expanded');
});

/*
add to cart number field
*/
$(document).on('click', ".item_counter button", function () {
  var parent = $(this).parents('.item_counter');
  var input = $(this).parents('.item_counter').find('input');
  var input_val = input.val();

  if ( $(this).hasClass('inc_button') ) {
    input_val++;
  } else if ( $(this).hasClass('dec_button') && input_val > 1 ) {
    input_val--;
  }
  input.val(input_val);
});

/*
sample like product
*/
$('.product-like-button').on('click',function(e){
  e.preventDefault();
  var like_button = $(this);
  like_button.addClass('loader');
  setTimeout(function() {
    like_button.toggleClass('liked');
    like_button.removeClass('loader');
  }, 1000);

});
/*
sample addtocart product
*/
$('.product-addtocart-button').on('click',function(e){
  e.preventDefault();
  var addtocart_button = $(this);
  addtocart_button.addClass('loader');
  setTimeout(function() {
    addtocart_button.toggleClass('added');
    addtocart_button.removeClass('loader');
  }, 1000);

});
/*
Graph
circle proccessbar canvas
*/
jQuery(document).ready(function() {
  var statebar = $('.rating-chart');
  if (statebar.length) {
    var el = document.getElementById('pgraph'); // get canvas
    var options = {
      percent:  el.getAttribute('data-percent') || 25,
      size: el.getAttribute('data-size') || 110,
      lineWidth: el.getAttribute('data-line') || 5,
      rotate: el.getAttribute('data-rotate') || 0,
      color01 : el.getAttribute('data-color01') || '#FF6686',
      color02 : el.getAttribute('data-color02') || '#E72678',
      back : el.getAttribute('data-back') || '#efefef',
    }

    var canvas = document.createElement('canvas');
    if (typeof(G_vmlCanvasManager) !== 'undefined') {
      G_vmlCanvasManager.initElement(canvas);
    }

    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = options.size;
    //Create gradient
    var gradient = ctx.createLinearGradient(0,options.size,0,0);
    gradient.addColorStop(0, options.color01);
    gradient.addColorStop(1, options.color02);
    el.appendChild(canvas);
    ctx.translate(options.size / 2, options.size / 2); // change center
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg
    var radius = (options.size - options.lineWidth) / 2;
    var drawCircle = function(color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round'; // butt, round or square
        ctx.lineWidth = lineWidth
        ctx.stroke();
    };
    drawCircle(options.back, options.lineWidth, 100 / 100);
    drawCircle(gradient, options.lineWidth, options.percent / 100);
  }
});

$(document).on('click','.recomment-toggle',function(e){
  e.preventDefault();
  $button = $(this);
  $first_count = $button.text().replace('+','').replace('-','');
  if($button.hasClass('recomment')){
    $button.removeClass('recomment');
    $count = Number($first_count)-1;
    $button.text($count+'+');
  } else {
    $button.addClass('recomment');
    $count = Number($first_count)+1;
    $button.text($count+'+');
  }
});
$(document).on('focus','.review-textarea',function(e){
  $(this).addClass('focused');
});
function auto_grow_textarea(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}
$('.comment-toggle').on('click', function (e) {
  e.preventDefault();
  $('.product-tabs a').removeClass('active');
  $('[id="nav-review-tab"]').addClass('active')
  $(this).tab('show');
  $('html, body').animate({scrollTop:$('#product-description').position().top + 120}, 500,'swing');
})
$('.widget-toggle,.widget-head-toggle').on('click', function (e) {
  $widget = $(this).parents('.widget');
  if(!$widget.hasClass('open')){
    $widget.addClass('open').siblings().removeClass('open');
    $('.widget-body').slideUp(300);
    $widget.find('.widget-body').slideDown(300);
  } else {
    $widget.removeClass('open');
    $widget.find('.widget-body').slideUp(300);
  }
})
$('.navbar-buttons .navbar-button:not(.menu-toggle):not(.back-link)').on('click', function (e) {
   $('.navbar-buttons .navbar-button').removeClass('active');
   $(this).addClass('active');
});
$('[data-toggle-dropdown]').on('click', function (e) {
  $dropdown_attr = $(this).data('toggle-dropdown');
  $dropdown = $('[data-dropdown='+$dropdown_attr+']');
  $dropdown_menu = $dropdown.find('.dropdown-menu');
  if($dropdown_menu.hasClass('show')){
    $('.header-menu-back').removeClass('show');
    $('body').removeClass('overflow-hidden');
    $dropdown_menu.removeClass('show');
  } else {
    if(!$('.header-menu-back').length){
      $('body').append('<button type="button" class="header-menu-back"></button>');
    }
    $('.header-menu-back').addClass('show');
    $('.dropdown-menu').removeClass('show');
    $('.menu-toggle').removeClass('toggled');
    $('.header-menu').removeClass('show').removeClass('header-menu-fixed-bottom');
    $('.sidebar').removeClass('show');
    $dropdown_menu.addClass('show');
    $('body').addClass('overflow-hidden');
  }

})

$('.dismiss-dropdown').on('click', function (e) {
  $('.header-menu-back').removeClass('show');
  $('body').removeClass('overflow-hidden');
  $('.dropdown-menu').removeClass('show');
  $('.menu-toggle').removeClass('toggled');
  $('.sidebar').removeClass('show');
})
$('.form-ajax').on('submit', function (e) {
  $filter_button = $(this).find('[type="submit"]');
  $filter_button.addClass('loader');
  $filter_dropup = $filter_button.parents('.has-ajax-filtering');
  $filter_dropup.addClass('loader-progress');
  setTimeout(function() {
    $filter_dropup.removeClass('loader-progress');
    $filter_button.removeClass('loader');
    $('.header-menu-back').removeClass('show');
    $('.menu-toggle').removeClass('toggled');
    $('body').removeClass('overflow-hidden');
    $('.header-menu').removeClass('show').removeClass('header-menu-fixed-bottom');
    $('.sidebar').removeClass('show');
    $("html, body").stop().animate({scrollTop:0}, 500, 'swing');
    $('.dropdown-menu').removeClass('show');
  }, 2000);
  e.preventDefault();
})
$('.dropdown-from-bottom a[href="#"]').on('click', function (e) {
  e.preventDefault();
});

$('.sidebar-toggle').on('click', function (e) {
  $sidebar = $('.sidebar');
  if($sidebar.hasClass('show')){
    $('.header-menu-back').removeClass('show');
    $('body').removeClass('overflow-hidden');
    $sidebar.removeClass('show');
  } else {
    if(!$('.header-menu-back').length){
      $('body').append('<button type="button" class="header-menu-back"></button>');
    }
    $('.header-menu-back').addClass('show');
    $('.dropdown-menu').removeClass('show');
    $('.menu-toggle').removeClass('toggled');
    $('.header-menu').removeClass('show').removeClass('header-menu-fixed-bottom');
    $sidebar.addClass('show');
    $('body').addClass('overflow-hidden');
  }

})
$('.back-link').on('click', function (e) {
    $('.navbar-buttons .navbar-button').removeClass('active');
    $('.header-menu-back').removeClass('show');
    $('.dropdown-menu').removeClass('show');
    $('.menu-toggle').removeClass('toggled');
    $('.header-menu').removeClass('show').removeClass('header-menu-fixed-bottom');
    $('.sidebar').removeClass('show');
    $('body').removeClass('overflow-hidden');
})
$('[name="payment[]"]').on('change',function(e){
  if ($('.payment-method-paypal').is(':checked')) {
    $('.btn-checkout').addClass('btn-paypal');
    $('#payform').slideUp(200);
  } else {
    $('.btn-checkout').removeClass('btn-paypal');
    $('#payform').slideDown(200);
  }
})
$('.nav-column-border .nav-link').on('click', function(e){
  e.preventDefault();
  $('.nav-column-border .nav-item').removeClass('active');
  $(this).parent().addClass('active');
})

/**
 * Scrollbar init
 */
$(document).ready(function(){
  $('.scrollbar-inner').scrollbar();
});

/**
 * section wrapper
 */
$(document).ready(function(){
  $('.section-wrapper').each( function(e){
    var section = $(this).children('.section');
    var height = section.outerHeight();
    $(this).css({
      "height" : height,
      "position" : "relative",
    })
  });
});

/**
 * card
 */
$('.collapse').on('show.bs.collapse', function () {
	$card = $(this).parents('.card');
	$(this).parents('.accordion').find('.card').removeClass('card-shown');
	$card.addClass('card-shown');
}).on('hide.bs.collapse', function () {
	$card = $(this).parents('.card');
	if($card.hasClass('card-shown')) {
		$card.removeClass('card-shown');
	}
})