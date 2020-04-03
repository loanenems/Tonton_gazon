export function urlFromFilter(requestedPage = 1, pos = null) {
    let position = "";
    if(pos !== null) {
        position = JSON.stringify({lat: pos.coords.latitude, lon: pos.coords.longitude});
    }
    //This function return the checked option.
    let checkedEval = () => {
        const checkboxes = document.getElementsByName('eval');
        for (let checkbox of checkboxes) {
            if (checkbox.checked) {
                return checkbox.value;
            }
        }
        return "";
    };

    let filters = {
        search: document.getElementById('search').value,
        payout: document.getElementById('payout').value,
        rank: checkedEval(),
        page: requestedPage,
        distance: document.getElementById('distances').options[document.getElementById('distances').selectedIndex].value,
        position: position,
    };

    let url = "/search_advert";
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
