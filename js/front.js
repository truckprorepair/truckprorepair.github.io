$(function () {
  lightbox();
  menuSliding();
  utils();
  map();
});

/* =========================================
 *  lightbox
 *  =======================================*/

function lightbox() {
  $(document).delegate('*[data-toggle="lightbox"]', 'click', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox({
      left_arrow_class: '.fa .fa-chevron-left .arrow-left',
      right_arrow_class: '.fa .fa-chevron-right  .arrow-right',
    });
  });
}

// Map
function map() {
  if ($('#map').length > 0) {
    function initMap() {
      var location = new google.maps.LatLng(41.713556, -74.726686);

      var mapCanvas = document.getElementById('map');
      var mapOptions = {
        center: location,
        zoom: 16,
        panControl: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);

      var markerImage = '/img/marker_red.png';

      var marker = new google.maps.Marker({
        position: { lat: 41.713556, lng: -74.726686 },
        map: map,
        icon: markerImage,
      });

      var contentString =
        '<div class="info-window">' +
        '<h3>Truck Pro</h3>' +
        '<div class="info-content">' +
        '<p>895 Old Route 17<br />Harris, NY 12742</p>' +
        '</div>' +
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400,
      });

      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });

      var styles = [
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f7f1df',
            },
          ],
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ebf2e6',
            },
          ],
        },
        {
          featureType: 'landscape.natural.terrain',
          elementType: 'geometry',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi.business',
          elementType: 'all',
          stylers: [
            {
              visibility: 'on',
            },
          ],
        },
        {
          featureType: 'poi.medical',
          elementType: 'geometry',
          stylers: [
            {
              color: '#fbd3da',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#bde6ab',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'on',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffe15f',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#efd151',
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffffff',
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: 'black',
            },
          ],
        },
        {
          featureType: 'transit.station.airport',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#cfb2db',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#a2daf2',
            },
          ],
        },
      ];

      map.set('styles', styles);
    }

    google.maps.event.addDomListener(window, 'load', initMap);
  }
}

/* menu sliding */

function menuSliding() {
  $('.dropdown').on('show.bs.dropdown', function (e) {
    if ($(window).width() > 750) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    } else {
      $(this).find('.dropdown-menu').first().stop(true, true).show();
    }
  });
  $('.dropdown').on('hide.bs.dropdown', function (e) {
    if ($(window).width() > 750) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    } else {
      $(this).find('.dropdown-menu').first().stop(true, true).hide();
    }
  });
}

/* animations */

function animations() {
  delayTime = 0;
  $('[data-animate]').css({ opacity: '0' });
  $('[data-animate]').waypoint(
    function (direction) {
      delayTime += 150;
      $(this)
        .delay(delayTime)
        .queue(function (next) {
          $(this).toggleClass('animated');
          $(this).toggleClass($(this).data('animate'));
          delayTime = 0;
          next();
          //$(this).removeClass('animated');
          //$(this).toggleClass($(this).data('animate'));
        });
    },
    {
      offset: '90%',
      triggerOnce: true,
    }
  );

  $('[data-animate-hover]').hover(
    function () {
      $(this).css({ opacity: 1 });
      $(this).addClass('animated');
      $(this).removeClass($(this).data('animate'));
      $(this).addClass($(this).data('animate-hover'));
    },
    function () {
      $(this).removeClass('animated');
      $(this).removeClass($(this).data('animate-hover'));
    }
  );
}

function animationsSlider() {
  var delayTimeSlider = 400;

  $('.owl-item:not(.active) [data-animate-always]').each(function () {
    $(this).removeClass('animated');
    $(this).removeClass($(this).data('animate-always'));
    $(this).stop(true, true, true).css({ opacity: 0 });
  });

  $('.owl-item.active [data-animate-always]').each(function () {
    delayTimeSlider += 500;

    $(this)
      .delay(delayTimeSlider)
      .queue(function (next) {
        $(this).addClass('animated');
        $(this).addClass($(this).data('animate-always'));

        console.log($(this).data('animate-always'));
      });
  });
}

/* counters */

function counters() {
  $('.counter').counterUp({
    delay: 10,
    time: 1000,
  });
}

function utils() {
  /* tooltips */

  $('[data-toggle="tooltip"]').tooltip();

  /* click on the box activates the radio */

  $('#checkout').on(
    'click',
    '.box.shipping-method, .box.payment-method',
    function (e) {
      var radio = $(this).find(':radio');
      radio.prop('checked', true);
    }
  );
  /* click on the box activates the link in it */

  $('.box.clickable').on('click', function (e) {
    window.location = $(this).find('a').attr('href');
  });
  /* external links in new window*/

  $('.external').on('click', function (e) {
    e.preventDefault();
    window.open($(this).attr('href'));
  });
  /* animated scrolling */

  $('.scroll-to, .scroll-to-top').click(function (event) {
    var full_url = this.href;
    var parts = full_url.split('#');
    if (parts.length > 1) {
      scrollTo(full_url);
      event.preventDefault();
    }
  });
  function scrollTo(full_url) {
    var parts = full_url.split('#');
    var trgt = parts[1];
    var target_offset = $('#' + trgt).offset();
    var target_top = target_offset.top - 100;
    if (target_top < 0) {
      target_top = 0;
    }

    $('html, body').animate(
      {
        scrollTop: target_top,
      },
      1000
    );
  }
}

/* product detail gallery */

function productDetailGallery(confDetailSwitch) {
  $('.thumb:first').addClass('active');
  timer = setInterval(autoSwitch, confDetailSwitch);
  $('.thumb').click(function (e) {
    switchImage($(this));
    clearInterval(timer);
    timer = setInterval(autoSwitch, confDetailSwitch);
    e.preventDefault();
  });
  $('#mainImage').hover(
    function () {
      clearInterval(timer);
    },
    function () {
      timer = setInterval(autoSwitch, confDetailSwitch);
    }
  );
  function autoSwitch() {
    var nextThumb = $('.thumb.active')
      .closest('div')
      .next('div')
      .find('.thumb');
    if (nextThumb.length == 0) {
      nextThumb = $('.thumb:first');
    }
    switchImage(nextThumb);
  }

  function switchImage(thumb) {
    $('.thumb').removeClass('active');
    var bigUrl = thumb.attr('href');
    thumb.addClass('active');
    $('#mainImage img').attr('src', bigUrl);
  }
}

/* product detail sizes */

function productDetailSizes() {
  $('.sizes a').click(function (e) {
    e.preventDefault();
    $('.sizes a').removeClass('active');
    $('.size-input').prop('checked', false);
    $(this).addClass('active');
    $(this).next('input').prop('checked', true);
  });
}

$.fn.alignElementsSameHeight = function () {
  $('.same-height-row').each(function () {
    var maxHeight = 0;
    var children = $(this).find('.same-height');
    children.height('auto');
    if ($(window).width() > 768) {
      children.each(function () {
        if ($(this).innerHeight() > maxHeight) {
          maxHeight = $(this).innerHeight();
        }
      });
      children.innerHeight(maxHeight);
    }

    maxHeight = 0;
    children = $(this).find('.same-height-always');
    children.height('auto');
    children.each(function () {
      if ($(this).height() > maxHeight) {
        maxHeight = $(this).innerHeight();
      }
    });
    children.innerHeight(maxHeight);
  });
};

$(window).load(function () {
  windowWidth = $(window).width();

  $(this).alignElementsSameHeight();
});
$(window).resize(function () {
  newWindowWidth = $(window).width();

  if (windowWidth !== newWindowWidth) {
    setTimeout(function () {
      $(this).alignElementsSameHeight();
    }, 205);
    windowWidth = newWindowWidth;
  }
});
