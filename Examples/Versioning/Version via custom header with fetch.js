/*
This example shows how to set the version of the API via a custom header
*/

const _apiBaseUrl = "https://customer.zenya.work/api";
const _bearerToken = "bearer token"; // See authorization examples how to get a secure token
 
// Create token and call function to get the iProva version
fetch(`${_apiBaseUrl}/versions/api`, {
    method: 'GET',
    headers: {
        'X-Api-Version': '5',
        'Accept': 'application/vnd.example.api+json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_bearerToken}`
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(result => {
    alert(result.version);
})
.catch(error => {
    alert(error);
});