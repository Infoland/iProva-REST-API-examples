/*
This example shows how to obtain a bearer token using OAuth client credentials.
You should never expose your client_id or client_secret in the front end.
*/
const _clientId = "your-client-id";
const _clientSecret = "your-client-secret";

// Create URL-encoded form data
const formData = new URLSearchParams();
formData.append('grant_type', 'client_credentials');
formData.append('client_id', _clientId);
formData.append('client_secret', _clientSecret);

fetch("https://customer.zenya.work/api/oauth/token", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-version": "5",
        "Accept": "application/json"
    },
    body: formData
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(result => {
    // The response will contain access_token, token_type, and expires_in
    alert(`Access Token: ${result.access_token}\nExpires in: ${result.expires_in} seconds`);
})
.catch(error => {
    alert(error);
});