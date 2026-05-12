
const destinationInput = document.getElementById('destinationInput');
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const destinationDiv = document.getElementById('destinations');

function searchDestinations() {
    const searchTerm = destinationInput.value.trim().toLowerCase();
    if (searchTerm.length == 0) return;

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results;
            switch (searchTerm) {
                case 'beach':
                case 'beaches':
                    results = data['beaches'];
                    break;
                case 'temple':
                case 'temples':
                    results = data['temples'];
                    break;
                case 'country':
                case 'countries':
                    results = data['countries'].flatMap(country => country.cities);
                    break;
                default:
                    const country = data['countries'].find(country => country.name.toLowerCase() === searchTerm);
                    if (country) {
                        results = country.cities;
                    }
                    break;
            }

            if (results && results.length > 0) {
                let inner = '<div class="results-panel"><h2>Results</h2>';
                results.forEach(result => {
                    inner += '<div class="destination-card">';
                    inner += `<img src="${result.imageUrl}" alt="${result.name}"></img>`;
                    inner += `<h3>${result.name}</h3>`;
                    inner += `<p>${result.description}</p>`;
                    inner += '</div>';
                });
                inner += '</div>';
                destinationDiv.innerHTML = inner;
            } else {
                destinationDiv.innerHTML = '<div class="results-panel"><h2>No locations found</h2></div>';
            }
        });
}


function clearSearch() {
    destinationDiv.innerHTML = '';
    destinationInput.value = '';
}

btnSearch.addEventListener('click', searchDestinations);
btnClear.addEventListener('click', clearSearch);
destinationInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchDestinations();
    }
});
