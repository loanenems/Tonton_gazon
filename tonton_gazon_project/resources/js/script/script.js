import $ from 'jquery'
import './sliders'

$(function() {
    // Burger menu
    $('.navbar_hamburger').click( function() {
        if( $('.navbar_mobile').hasClass('inactive') ) {
            $('.navbar_mobile').removeClass('inactive');
            $('.navbar_mobile').addClass('active');
        } else {
            $('.navbar_mobile').addClass('inactive');
            $('.navbar_mobile').removeClass('active');
        }
    });

    // Display row or grid Advert listing
    $(".display_option").click( function() {
        if( $(this).hasClass("active") ) {
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

    // Display Tondu or Tondeur Advert's
    $(".btn_role_select").click( function() {
        $(".btn_role_select").removeClass("active");
        $(this).addClass("active");
    });

    // Hide or show Filter option Advert listing 
    if($(window).width() <  1348) {
        $(".advert_filter").hide();
        $("#advert_filter_display").click( function() {
            if( $("#advert_filter_display").hasClass("showed") ) {
                $("#advert_filter_display").removeClass("showed");
                $(".advert_filter").slideUp();
            } else {
                $("#advert_filter_display").addClass("showed");
                $(".advert_filter").slideDown();
            }
        });
    }

    // Hide adress on click, Garden create
    $(".garden_adress_suggestion_group").click( function () {
        $(this).hide();
    });
    $(".garden_adress_form").click( function () {
        $(".garden_adress_suggestion_group").show();
    })
});