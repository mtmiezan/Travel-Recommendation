const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const resultDiv = document.getElementById('result');
const inputSearch = document.getElementById('travelInput');

function searchRecommendation() {
    const input = inputSearch.value.toLowerCase();
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            //console.log("data", data)
            const isCountryKey = ["country","countries"].includes(input)
            const search =  isCountryKey ? "countries":input;
            const recommendation = Object.keys(data).find(rec => rec.toLowerCase().includes(search));
            if (recommendation) {
                //console.log("Result search", data[recommendation]);
                if(isCountryKey){
                    data[recommendation].forEach(country => {
                        country.cities.forEach(city =>{
                        resultDiv.innerHTML += `<div class="photo"><img src="${city.imageUrl}" alt="hjh"></div>`;
                        resultDiv.innerHTML += `<p><strong></strong> ${country.name},${city.name}</p>`;
                        resultDiv.innerHTML += `<p><strong>Description:</strong> ${city.description}</p>`;
                        });
                    });
                }
                else {
                    data[recommendation].forEach(item => {
                        resultDiv.innerHTML += `<div class="photo"><img src="${item.imageUrl}" alt="hjh"></div>`;
                        resultDiv.innerHTML += `<p><strong></strong> ${item.name}</p>`;
                        resultDiv.innerHTML += `<p><strong>Description:</strong> ${item.description}</p>`;
                    });
                }




            } else {
                resultDiv.innerHTML = 'Recommendation not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function resetResults(){
    resultDiv.innerHTML = '';
    inputSearch.value = "";
}

btnSearch.addEventListener('click', searchRecommendation);
btnReset.addEventListener('click', resetResults);