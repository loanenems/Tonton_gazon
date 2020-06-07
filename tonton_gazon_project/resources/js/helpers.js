export function urlFromFilter(requestedPage = 1, pos = null) {
    let position = "";
    if (pos !== null) {
        position = JSON.stringify({lat: pos.coords.latitude, lon: pos.coords.longitude});
    }
    //This function return the checked option for the user's eval.
    let checkedEval = () => {
        const radios = $('.rating').find(':checked');
        if(radios.length > 0) {
            return radios[0].value;
        }
        return "";
    };

    //This function return the checked option for the type of advert (tondeur or tondu).
    let checkedType = () => {
        if($('#tondeur').is(':checked')) {
            return "0";
        } else {
            return "1";
        }
    };


    let filters = {
        search: document.getElementById('search').value,
        payout: document.getElementById('payout').value,
        eval: checkedEval(),
        start_date: document.getElementById('start_date').value,
        end_date: document.getElementById('end_date').value,
        page: requestedPage,
        distance: document.getElementById('distances').options[document.getElementById('distances').selectedIndex].value,
        position: position,
        equipment: document.getElementById('equipment').checked,
        type: checkedType(),
    };

    let url = "/adverts";
    let cpt = 0;

    //Here, we map the filters list to construct the url for the search depending on the filters
    for (const property in filters) {
        if (`${filters[property]}` !== "") {
            if (cpt === 0) {
                url += "?" + property + "=" + `${filters[property]}`
            } else {
                url += "&" + property + "=" + `${filters[property]}`
            }
            cpt++;
        }
    }

    return url;
}

export function addDynamicalForm() {
    let nbDates = $('#date_group').find('input[type="date"]').length;
    if (nbDates < 6) {
        $('#date_group').append(
            '<input class="form_input" type="date" name="date_' + nbDates + '" id="date_' + nbDates + '"/>' +
            '<button class="remove_item">X</button>'
        );
    }
    $('.remove_item').unbind().click(function (e) {
        e.preventDefault();
        handleClick($(this));
    });
}

function handleClick(elem) {
    let nbDates = $('#date_group').find('input[type="date"]').length;
    let currId = parseInt($(elem).prev().attr('id').split('_')[1]);
    //If last
    if (currId === nbDates - 1) {
        $(elem).prev().remove();
        $(elem).remove();
    }
    //Somewhere before the last
    else {
        for (let i = currId + 1; i <= (nbDates - 1); i++) {
            $('#date_' + i).attr('name', 'date_' + (i - 1));
            $('#date_' + i).attr('id', 'date_' + (i - 1));
            $(elem).prev().remove();
            $(elem).remove();
        }
    }
}
