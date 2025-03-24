/*
This example shows how to implement a sliding token expiration system using the fetch API.
Note: Never expose your apiKey in the front end.
*/

const API_KEY = "set api key";
const USERNAME = "j.t.kirk";
let tokenId = null;

const API_BASE_URL = "https://customer.zenya.work/api";
const API_HEADERS = {
    "x-api-version": "5",
    "Accept": "application/vnd.example.api+json"
};

async function ensureToken(forceTokenRefresh = false) {
    if (forceTokenRefresh || !tokenId) {
        const response = await fetch(`${API_BASE_URL}/tokens`, {
            method: "POST",
            headers: {
                ...API_HEADERS,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ api_key: API_KEY, username: USERNAME })
        });
        tokenId = await response.json();
    }
    return tokenId;
}

async function executeAPICall({ method, url, forceTokenRefresh = false }) {
    try {
        await ensureToken(forceTokenRefresh);
        
        const response = await fetch(url, {
            method,
            headers: {
                ...API_HEADERS,
                "Authorization": `Token ${tokenId}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const error = await response.json();
            if (error === "token_expired") {
                // Retry with a new token
                return executeAPICall({ method, url, forceTokenRefresh: true });
            }
            throw new Error(JSON.stringify(error));
        }

        return await response.json();
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
}

// Example usage
async function getiProvaVersion() {
    try {
        const result = await executeAPICall({
            method: "GET",
            url: `${API_BASE_URL}/versions/iprova`
        });
        console.log("iProva version:", result);
        return result;
    } catch (error) {
        console.error("Failed to get iProva version:", error);
    }
} 