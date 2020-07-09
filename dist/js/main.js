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
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player("introduction-video", {
        height: "100%",
        width: "100%",
        videoId: "M7lc1UVf-VE",
        events: {
          // onReady: onPlayerReady,
          // onStateChange: onPlayerStateChange
        }
      });
    }

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      player.stopVideo();
    }

    $(".videoplay__go").on("click", function(e) {
      e.preventDefault();
      player.playVideo();
      $(this)
        .parent()
        .addClass("videoplay_start");
    });
  })();

  /**
   * Слайдер "Отзывы"
   */
  (function() {
    function sliderReviewsInstall() {
      var sliderReviews = new Swiper("#slider-reviews", {
        slidesPerView: 1,
        spaceBetween: 32,
        autoHeight: true,
        calculateHeight: true,
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
      window.sliderReviews = sliderReviews;
    }
    sliderReviewsInstall();
    function sliderReviewsReload() {
      sliderReviews.destroy();
      sliderReviewsInstall();
    }
    window.sliderReviewsReload = sliderReviewsReload;
  })();

  /**
   * Открывающиеся текстовые блоки
   */
  (function() {
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
  })();

  (function() {
    $(".reviews__more").on("click", function(e) {
      e.preventDefault();
      $(this)
        .closest(".reviews")
        .find(".reviews__hidden")
        .toggle();
      sliderReviewsReload();
    });
  })();

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
