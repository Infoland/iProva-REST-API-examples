/*
This example shows how to call the version API endpoint using a bearer token.
The bearer token should be obtained through one of the authentication methods:
- OAuth client credentials
- Basic HTTP authentication
- One Time Password (OTP) token
*/

const API_BASE_URL = "https://customer.zenya.work/api";
const BEARER_TOKEN = "your-bearer-token-here"; // Replace with your actual bearer token

async function getApiVersion() {
    try {
        const response = await fetch(`${API_BASE_URL}/versions/iprova`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${BEARER_TOKEN}`,
                "Accept": "application/vnd.example.api+json",
                "x-api-version": "5",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Version:", result.version);
        return result;
    } catch (error) {
        console.error("Error fetching API version:", error);
        throw error;
    }
}

// Example usage
getApiVersion()
    .then(result => {
        // Handle the successful response
        console.log("Successfully retrieved API version");
    })
    .catch(error => {
        // Handle any errors
        console.error("Failed to get API version:", error);
    }); 