import $ from 'jquery';

$(function () {
    $(".form_input_container .form_input").focusin(function () {
        $("label[for='" + $(this).attr("id") + "']").fadeTo(200,1);
        $($(this).attr("placeholder")).fadeTo(200,0);
    });
    $(".form_input_container .form_input").focusout(function () {
        $("label[for='" + $(this).attr("id") + "']").fadeTo(200,0);
    });
});