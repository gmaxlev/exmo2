/* 
  Глобальные контрольные точки медиазпросов
*/
window._breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

$(document).ready(function() {
  /**
   * wow.js
   */
  (function() {
    var intro = new WOW({
      boxClass: "intro", // default
      animateClass: "intro_anim", // default
      offset: 0, // default
      mobile: true, // default
      live: true // default
    });
    intro.init();
    new WOW().init();
  })();

  /**
   * Мобильное меню
   */
  (function() {
    $(".header__menu").on("click", function(e) {
      e.preventDefault();
      $(".mobmenu").addClass("mobmenu_open");
    });
    $(".mobmenu__close").on("click", function(e) {
      e.preventDefault();
      $(".mobmenu").removeClass("mobmenu_open");
    });
    $(".mobmenu__item > a").on("click", function(e) {
      e.preventDefault();
      $(this)
        .closest(".mobmenu")
        .removeClass("mobmenu_open");
    });
  })();

  /**
   * Видео
   */
  (function() {
    var start = false;
    function eventFire(el, etype) {
      if (el.fireEvent) {
        el.fireEvent("on" + etype);
      } else {
        var evObj = document.createEvent("Events");
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }
    $("#introduction-video-start").on("click", function(e) {
      e.preventDefault();
      var video = document.getElementById("introduction-video");
      $(this)
        .parent()
        .addClass("videoplay_start");
      video.play();
      function openFullscreen() {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      }
      video.onplay = function() {
        openFullscreen();
      };
    });
    $("#intro-watch").on("click", function() {
      setTimeout(function() {
        eventFire(document.getElementById("introduction-video-start"), "click");
      }, 100);
      function onFullScreen() {
        if (!start) {
          window.scrollTo(0, 0);
          start = true;
        }
      }

      document
        .getElementById("introduction-video")
        .addEventListener("webkitfullscreenchange", onFullScreen);
      document
        .getElementById("introduction-video")
        .addEventListener("mozfullscreenchange", onFullScreen);
      document
        .getElementById("introduction-video")
        .addEventListener("fullscreenchange", onFullScreen);
    });
  })();

  /**
   * Слайдер "Отзывы"
   */
  (function() {
    var lastSlide = 0;
    function sliderReviewsInstall() {
      var sliderReviews = new Swiper("#slider-reviews", {
        slidesPerView: 1,
        spaceBetween: 32,
        autoHeight: true,
        calculateHeight: true,
        on: {
          init: function() {
            this.slideTo(lastSlide);
          }
        },
        breakpoints: {
          [_breakpoints["lg"]]: {
            slidesPerView: 3,
            spaceBetween: 32
          },
          [_breakpoints["md"]]: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        },
        pagination: {
          el: "#slider-reviews-nav",
          clickable: true,
          renderBullet: function(index, className) {
            return '<span class="' + className + '"></span>';
          }
        }
      });
      sliderReviews.on("slideChange", function() {
        lastSlide = sliderReviews.activeIndex;
      });
      window.sliderReviews = sliderReviews;
    }
    sliderReviewsInstall();
    function sliderReviewsReload() {
      sliderReviews.destroy();
      sliderReviewsInstall();
    }
    window.sliderReviewsReload = sliderReviewsReload;

    setTimeout(function() {
      sliderReviewsReload();
    }, 2000);

    $(".reviews__more > a").on("click", function(e) {
      e.preventDefault();
      $(this)
        .closest(".reviews")
        .find(".reviews__hidden")
        .toggle();
      $(this).toggleClass("toggle-more_open");
      sliderReviewsReload();
    });
  })();

  /**
   * Открывающиеся текстовые блоки
   */
  /*   (function() {
    $(".panel").each(function(index, element) {
      var that = this;
      var panel = $(element);
      var image = $(panel).find(".panel__image");
      var hide = $(panel).find(".panel__hide");
      var show = $(panel).find(".panel__show");
      var hidden = $(panel).find(".panel__hidden");
      var more = $(panel).find(".more");
      $(element)
        .find(".more")
        .on("click", function(e) {
          e.preventDefault();
          $(hide).addClass("panel__hide_show");
          setTimeout(function() {
            image.slideUp(500);
            more.slideUp(500);
          }, 500);
          setTimeout(function() {
            hidden.slideDown(500);
          }, 1000);
          setTimeout(function() {
            hide.removeClass("panel__hide_show");
            show.addClass("panel__show_show");
            panel.addClass("panel_open");
          }, 1500);
          setTimeout(function() {
            show.removeClass("panel__show_show");
          }, 2000);
        });
      $(element)
        .find(".panel__close")
        .on("click", function(e) {
          e.preventDefault();
          $(hide).addClass("panel__hide_show");
          setTimeout(function() {
            hidden.slideUp(500);
          }, 500);
          setTimeout(function() {
            panel.removeClass("panel_open");
            image.slideDown(500);
            more.slideDown(500);
          }, 1000);
          setTimeout(function() {
            hide.removeClass("panel__hide_show");
            show.addClass("panel__show_show");
          }, 1500);
          setTimeout(function() {
            show.removeClass("panel__show_show");
          }, 2000);
        });
    });
  })(); */

  /**
   * Плавная прокрутка
   */
  (function() {
    $("[data-scrollto]").on("click", function(e) {
      e.preventDefault();
      var id = $(this).attr("data-scrollto");
      var fix = 0;
      if (window.innerWidth < _breakpoints["md"]) {
        fix = $(".header").innerHeight();
      }
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#" + id).offset().top - fix
        },
        2000
      );
    });
  })();
});
