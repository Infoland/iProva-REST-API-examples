/*
This example shows how credential authentication is handled with fetch API.
Of course you should never expose your apiKey in the front end.
Also a token can expire after a while. It is possible to implement a sliding token expiration system. There is a different example for that.
*/

const _apiKey = "set api key";
const _userName = "j.t.kirk";
const _password = "set password";
let _bearerTokenID;

// Create token and call function to get the iProva version
fetch("http://iprova/api/bearer_tokens", {
    method: "POST",
    headers: {
        "x-api-version": "5",
        "x-api_key": _apiKey,
        "Accept": "application/vnd.example.api+json",
        "Authorization": `credentials u:${_userName} pwd:${_password}`,
        "Content-Type": "application/json"
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(result => {
    _bearerTokenID = result;
    return displayIProvaVersion();
})
.catch(error => {
    console.error('Error:', error);
    alert(error);
});

async function displayIProvaVersion() {
    try {
        const response = await fetch("http://iprova/api/versions/iprova", {
            method: "GET",
            headers: {
                "Authorization": `bearer ${_bearerTokenID}`,
                "Accept": "application/vnd.example.api+json",
                "x-api-version": "1",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.version);
    } catch (error) {
        console.error('Error:', error);
        alert(error);
    }
}
