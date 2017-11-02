require('./js/flexible.js');
require('./js/loading.js');
require('./js/swiper.min.js');

require('./fonts/iconfont.css');
require('./styles/swiper.min.css');
require('./styles/normalize.scss');
require('./styles/loading.scss');
require('./styles/app.scss');

$(document).ready(function() {

  var swiper = new Swiper('.swiper-container', {
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false
  });
});
