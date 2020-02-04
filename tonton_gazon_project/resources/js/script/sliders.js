import $ from 'jquery'

$(function() {
  if($(window).width() <= 640) {
    $('.recent_list').slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '48px',
      variableWidth: true,
    });

    $('.tondeurs_list').slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '48px',
      variableWidth: true,
    });
  }
});

