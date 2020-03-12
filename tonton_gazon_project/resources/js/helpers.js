export function urlFromFilter(requestedPage = 1) {
    //Filters. Add theme here if needed in search

    let checkedRank = () => {
        const checkboxes = document.getElementsByName('rank');
        for(let checkbox of checkboxes) {
            if(checkbox.checked) {
                return checkbox.value;
            }
        }
        return "";
    };

    let filters = {
        search: document.getElementById('search').value,
        payout: document.getElementById('payout').value,
        rank: checkedRank(),
        page: requestedPage
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
