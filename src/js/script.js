
// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         // adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                   dots: true,
//                   arrows: false
//             }
//         }
//         ]
//     })
//     });


  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: true

  });

  document.querySelector('.prev').addEventListener ('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener ('click', function () {
    slider.goTo('next');
});

(function($) {
  $(function() {
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    
  });


  // $('.catalog-item__link').each(function(i) {
  //   $(this).on('click', function (e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq().toggleClass('catalog-item__list_active');
  //   })
  // })
  // $('.catalog-item__back').each(function(i) {
  //   $(this).on('click', function (e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq().toggleClass('catalog-item__list_active');
  //   })
  // })

  function toggleSlider(item) {
    $(item).each(function(i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };
  
  toggleSlider('.catalog-item__link');
  toggleSlider('.catalog-item__back');

  //modal

  $('[data-modal=consutation]').on('click', function() {
    $('.overlay,#consutation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay,#consutation, #order, #thanks').fadeOut('slow');
  });
  $('.button_mini').each(function(i) {
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay,#order').fadeIn('slow');
    })
  });

  function validateForms (form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста, введите свое имя",
        phone: "Пожалуйста, введите свой телефон",
        email: {
          required: "Нам нужна ваша почта для связи с вами",
          email: "Ваша почта должна быть в формате name@domain.com"
        }
      }
    });

  };
  validateForms ('#consultation-form');
  validateForms ('#consutation form');
  validateForms ('#order form');

  $('input[name=phone]').mask("+38 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    let $form = $(this);
    if(! $form.valid()) return false;
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("");
      $('#consutation, #order').fadeOut('slow');
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');

    });
    return false;

  });

  //up

  $(window).scroll(function() {
    if($(this).scrollTop () > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

 $("a[href='#up']").click(function() {
   const _href = $(this).attr("href");
   $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
   return false;
 })

 new WOW().init();

  })(jQuery);