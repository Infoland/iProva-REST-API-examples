/*
This example shows how to log a user in with the OAuth authorization code flow (with PKCE),
using a public app registration. The flow has two steps:

  1. Exchange the user's credentials for a short-lived, single-use authorization code.
  2. Exchange that code for an access token (and refresh token).

PKCE protects against authorization code interception: we generate a random "code verifier",
send only its SHA-256 hash (the "code challenge") in step 1, and prove ownership by sending
the original verifier in step 2.
*/

const _baseUrl = "https://customer.zenya.work/api";
const _clientId = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; // your public app registration id
const _redirectUri = "https://app.example.com/callback";  // must match a registered redirect uri

// --- PKCE helpers -----------------------------------------------------------

// A high-entropy random string (43-128 chars) used as the PKCE code verifier.
function generateCodeVerifier() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return base64UrlEncode(bytes);
}

// code_challenge = BASE64URL(SHA256(code_verifier))
async function generateCodeChallenge(codeVerifier) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
    return base64UrlEncode(new Uint8Array(digest));
}

function base64UrlEncode(bytes) {
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

// --- Step 1: get a short-lived authorization code ---------------------------

async function getAuthorizationCode(loginCode, password, codeChallenge) {
    const response = await fetch(`${_baseUrl}/oauth/authorize/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-version": "5",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            loginCode: loginCode,
            password: password,
            clientId: _clientId,
            redirectUri: _redirectUri,
            codeChallenge: codeChallenge
            // twoFactorCode: "123456" // include when two-factor authentication is required
        })
    });

    if (!response.ok) {
        // Errors use the OAuth { error, error_description } convention.
        throw new Error(`authorize/login failed! status: ${response.status}`);
    }

    const result = await response.json();
    return result.code; // single-use, expires after 60 seconds - exchange it immediately
}

// --- Step 2: exchange the code for tokens -----------------------------------

async function exchangeCodeForToken(code, codeVerifier) {
    // Do NOT send a client_secret; public clients have none.
    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code");
    formData.append("client_id", _clientId);
    formData.append("code", code);
    formData.append("redirect_uri", _redirectUri);
    formData.append("code_verifier", codeVerifier);
    // formData.append("set_cookie", "true"); // WebForms flow: set auth cookies instead of returning tokens in the body

    const response = await fetch(`${_baseUrl}/oauth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-api-version": "5",
            "Accept": "application/json"
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(`token exchange failed! status: ${response.status}`);
    }

    return await response.json(); // { access_token, token_type, expires_in, refresh_token }
}

// --- Run the full flow ------------------------------------------------------

async function login(loginCode, password) {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const code = await getAuthorizationCode(loginCode, password, codeChallenge);
    const tokens = await exchangeCodeForToken(code, codeVerifier);

    // Use tokens.access_token as: Authorization: Bearer <access_token>
    alert(`Access Token: ${tokens.access_token}\nExpires in: ${tokens.expires_in} seconds`);
}

login("j.doe", "S3cr3tP@ssw0rd").catch(error => alert(error));
