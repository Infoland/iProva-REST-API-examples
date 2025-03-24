/*
This example shows how credential authentication is handled with fetch API.
Of course you should never expose your apiKey in the front end.
Also a token can expire after a while. It is possible to implement a sliding token expiration system. There is a different example for that.
*/

const _apiKey = "set api key";
const _userName = "j.t.kirk";
let _tokenID;

// Helper function to handle fetch errors
const handleFetchError = (error) => {
    alert(JSON.stringify(error));
};

// Create token and call function to get the Zenya version
fetch("https://customer.zenya.work/api/tokens", {
    method: "POST",
    headers: {
        "x-api-version": "5",
        "Accept": "application/vnd.example.api+json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "api_key": _apiKey,
        "username": _userName
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(result => {
    _tokenID = result;
    displayZenyaVersion();
})
.catch(handleFetchError);

function displayZenyaVersion() {
    fetch("https://customer.zenya.work/api/versions/iprova", {
        method: "GET",
        headers: {
            "Authorization": "token " + _tokenID,
            "Accept": "application/vnd.example.api+json",
            "x-api-version": "1"
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
    .catch(handleFetchError);
}
