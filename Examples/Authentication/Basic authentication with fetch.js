/*
This example shows how credential authentication is handled with the Fetch API.
Of course you should never expose your apiKey or password in the front end.
Also you should only use Basic authentication to create a bearer token.
*/
const _userName = "j.t.kirk";
const _password = "set password";

fetch("https://customer.zenya.work/api/bearer_tokens", {
    method: "POST",
    headers: {
        "Authorization": "Basic " + btoa(_userName + ":" + _password),
        "x-api-version": "5",
        "Accept": "application/vnd.example.api+json"
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(result => {
    alert(result);
})
.catch(error => {
    alert(error);
});