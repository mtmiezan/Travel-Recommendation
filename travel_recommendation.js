const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

function searchRecommendation() {
    const input = document.getElementById('travelInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log("data", data)

            const recommendation = Object.keys(data).find(rec => rec.toLowerCase().includes(input));
            if (recommendation) {
                console.log("Result search", data[recommendation]);
                data[recommendation].forEach(item => {
                    resultDiv.innerHTML += `<img src="${item.imagesrc}" alt="hjh">`;
                    resultDiv.innerHTML += `<p><strong>Description:</strong> ${item.description}</p>`;
                });



            } else {
                resultDiv.innerHTML = 'Recommendation not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
btnSearch.addEventListener('click', searchRecommendation);