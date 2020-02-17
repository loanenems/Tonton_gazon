import $ from 'jquery'
import './sliders'

$(function() {
    $('.navbar_hamburger').click( function() {
        if( $('.navbar_mobile').hasClass('inactive') ) {
            $('.navbar_mobile').removeClass('inactive');
            $('.navbar_mobile').addClass('active');
        } else {
            $('.navbar_mobile').addClass('inactive');
            $('.navbar_mobile').removeClass('active');
        }
    });
});