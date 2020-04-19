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

    $(".display_option").click( function() {
        if( $(this).hasClass("active") ) {
            alert($(this).attr("data-display"))
            $(".advert_list_container").removeClass("advert_list_container_row"); 
            $(".advert_list_container").removeClass("advert_list_container_grid"); 
            $(".advert_list_container").addClass( $(this).attr("data-display") ); 
        } else {
            $(".advert_list_container").removeClass("advert_list_container_row"); 
            $(".advert_list_container").removeClass("advert_list_container_grid"); 
            $(".advert_list_container").addClass( $(this).attr("data-display") ); 
            $(".display_option").removeClass("active");
            $(this).addClass("active");
        }
    });
});