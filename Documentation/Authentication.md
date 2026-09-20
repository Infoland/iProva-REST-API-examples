
# API Authentication

Our API uses Bearer Token authentication to secure endpoints. Clients must include a valid token in the `Authorization` header of each request, formatted as `Authorization: Bearer <token>`.

Bearer Tokens have a fixed expiration date of 2 weeks after generation. However, using the bearer token, you can request a new bearer token. So by getting a new bearer token within 2 weeks, it is possible to implement your own sliding expiration

Example:
```
curl -X GET https://customer.zenya.work/api/<some_resources>> \
  -H "Authorization: Bearer <generated-token>"
```

For a real life example of calling the API using a token, see [Bearer token example][BearerTokenExample].

# Obtaining a Bearer Token

There are 2 methods to generate a bearer token:
- Use the OAuth Token end point
- Use the Bearer Token end point
  - Basic HTTP Authentication
  - One Time Password token


## 1. OAuth Token Endpoint

To use the OAuth endpoints you need an app registration in Zenya. An _app registration_ is created through _Application Management_ and comes in two types:
- **Confidential** app registrations are used for machine-to-machine communication (the client credentials flow). They have a client secret.
- **Public** app registrations are used to log a user in from an app that cannot keep a secret, such as a Single Page Application (SPA). They have no secret and use the authorization code flow with PKCE.

For more information about the OAuth 2.0 standard, see this [web page][oauth2standard].

Two flows are supported:
- **[Client Credentials Flow](#11-client-credentials-flow-machine-to-machine)** — authenticate as the application itself.
- **[Authorization Code Flow with PKCE](#12-authorization-code-flow-with-pkce-user-login)** — authenticate a user and obtain a token on their behalf.

### 1.1 Client Credentials Flow (machine to machine)

Use this flow to authenticate as the application itself (no user context), using a confidential app registration. We support two authentication methods:
- client_id + client_secret (RFC 6749)
- client_id + client_assertion (RFC 7523, JWT client assertion).

Route details:

- **Endpoint**: `POST /oauth/token`
- **Content-Type**: `application/x-www-form-urlencoded`
- **Request Body Parameters**:
  - `grant_type`: "client_credentials"
  - `client_id`: "Your client id"
  - `client_secret`: "Your client secret"
- **Response**:
  ```json
  {
    "access_token": "<generated-token>",
    "token_type": "Bearer",
    "expires_in": 600,
  }
  ```

Exampe of getting a Bearer Token using the OAuth Token EndPoint, using a client secret (RFC 6749):

```curl
curl -X 'POST' \
  'https://customer.zenya.work/api/oauth/token' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'x-api-version: 5' \
  -d 'grant_type=client_credentials&client_id=d4fd4842-e80e-417f-b5e5-78f5e413448d&client_secret=%23S8rKlE%2BVJW%21e%29KNbHWSi%23%26-6s52%26u_PqAUoS2Q%2BDGtEYhd%5Eg%2BjxbEaFvF3rZOJH'
```

Exampe of getting a Bearer Token using the OAuth Token EndPoint, using a client assertion (RFC 7523):

```curl
curl -X 'POST' \
  'https://customer.zenya.work/api/oauth/token' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'x-api-version: 5' \
  -d 'grant_type=client_credentials&client_id=d4fd4842-e80e-417f-b5e5-78f5e413448d&client_secret=%23S8rKlE%2BVJW%21e%29KNbHWSi%23%26-6s52%26u_PqAUoS2Q%2BDGtEYhd%5Eg%2BjxbEaFvF3rZOJH'
```

[Example of implementation][oathexample].

### 1.2 Authorization Code Flow with PKCE (user login)

Use this flow to log a **user** in and obtain a token on their behalf. It targets a **public** app registration (no client secret) and always uses PKCE (Proof Key for Code Exchange, RFC 7636) to protect against authorization code interception.

The flow has two steps:
1. Exchange the user's credentials for a short-lived, single-use **authorization code** (`POST /oauth/authorize/login`).
2. Exchange that code for an access token (and refresh token) (`POST /oauth/token`).

[Example of implementation][authcodeexample].

#### PKCE code verifier & code challenge

Before starting, generate a random **code verifier** and derive a **code challenge** from it:

- `code_verifier`: a high-entropy random string (43–128 characters).
- `code_challenge`: `BASE64URL(SHA256(code_verifier))`.

You send the `code_challenge` in step 1 and prove ownership by sending the original `code_verifier` in step 2. For testing you can use an online [PKCE generator][pkcegenerator].

#### Step 1 — Get an authorization code

- **Endpoint**: `POST /oauth/authorize/login`
- **Content-Type**: `application/json`
- **Request Body Parameters**:
  - `loginCode`: the user's login code
  - `password`: the user's password
  - `clientId`: the public app registration id (a Guid)
  - `redirectUri`: must exactly match one of the redirect uris registered for the client
  - `codeChallenge`: the PKCE code challenge derived above
  - `twoFactorCode` (optional): the user's two-factor code, when two-factor authentication is required
- **Response**:
  ```json
  {
    "code": "<short-lived-authorization-code>"
  }
  ```

The code is single-use and expires after 60 seconds, so exchange it immediately.

```curl
curl -X 'POST' \
  'https://customer.zenya.work/api/oauth/authorize/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'x-api-version: 5' \
  -d '{
  "loginCode": "j.doe",
  "password": "S3cr3tP@ssw0rd",
  "clientId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "redirectUri": "https://app.example.com/callback",
  "codeChallenge": "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
}'
```

Error responses use the OAuth `error` / `error_description` convention:
- `400 invalid_client` — the `client_id` is not a known public app registration, or the `redirect_uri` does not match a registered redirect uri.
- `401 invalid_credentials` / `login_not_permitted` / `two_factor_required` / `two_factor_code_invalid` — the credentials are invalid, login is not permitted, or two-factor authentication is required/invalid.
- `429 too_many_attempts` — too many failed attempts for this login code (rate limited).

#### Step 2 — Exchange the code for a token

- **Endpoint**: `POST /oauth/token`
- **Content-Type**: `application/x-www-form-urlencoded`
- **Request Body Parameters**:
  - `grant_type`: "authorization_code"
  - `client_id`: the same public app registration id used in step 1
  - `code`: the authorization code from step 1
  - `redirect_uri`: must match the value used in step 1
  - `code_verifier`: the original PKCE code verifier
  - `set_cookie` (optional, default `false`): see [Cookie flow](#cookie-flow-webforms) below
  - Do **not** send a `client_secret` — public clients have none, and supplying one is rejected.
- **Response**:
  ```json
  {
    "access_token": "<generated-token>",
    "token_type": "Bearer",
    "expires_in": 600,
    "refresh_token": "<refresh-token>"
  }
  ```

```curl
curl -X 'POST' \
  'https://customer.zenya.work/api/oauth/token' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'x-api-version: 5' \
  -d 'grant_type=authorization_code&client_id=3fa85f64-5717-4562-b3fc-2c963f66afa6&code=<code>&redirect_uri=https%3A%2F%2Fapp.example.com%2Fcallback&code_verifier=<verifier>'
```

The returned `access_token` is a JWT identical in form to the one issued by the client credentials flow, and is used the same way (`Authorization: Bearer <token>`).

Error responses (all `400`):
- `invalid_grant` — the code is invalid, expired, already used, issued for a different client, the `redirect_uri` does not match, or the `code_verifier` does not match the `code_challenge`.
- `invalid_request` — a required parameter (`code`, `redirect_uri`, `code_verifier`) is missing, or a `client_secret` was supplied.

For security, an unknown code and a code issued for a different client both return the same generic `invalid_grant` "code is invalid or expired" message, so the endpoint does not leak whether a client is known.


## 2. Bearer Token EndPoint (for user to machine authentication)
- **Endpoint**: `POST /bearer_tokens`
- **Authentication**: Basic HTTP Authentication (username/password) or OTP (Token)
- **Request Body**: None required
- **Response**: a string with the bearer token

### 2.1 With Basic Http Authentication
Submit your credentials via Basic Auth to receive a bearer token. The header should contain the string "Basic" followed by a base64 encoded string containing the credentials in the following format `<username>:<password>`. See also https://datatracker.ietf.org/doc/html/rfc7617. [Example of implementation][basicexample].


Example of getting a Bearer Token with basic http authentication
```curl
curl --location --request POST 'https://customer.zenya.work/api/bearer_tokens' \
--header 'accept: application/json' \
--header 'x-api-version: 5' \
--header 'Authorization: Basic =123455vxvxcv'
```

### 2.2 With One Time Password
There is also an older system which is used to generate something like an "One Time Password" (OTP), an token based on an api key and a user name. This is used in cases that a system wants to automaticly log a user into Zenya. [Example of implementation][tokenexample].

Tokens are linked to an Api Key, defined as a resource in Zenya. Tokens can only be generated using an api-key for which "token generation" has been enabled in the product. The usage of the API key can be restricted on a set of IP Address ranges (IPv4 and IPv6) and/or on a set of user names. Tokens are time-limited and, by default, expire after 5 minutes. The API key can be configured for sliding expiration, which extends validity while in use. Always assume a token has expired and request a new one when needed.

Example of getting a token:
```c
curl -X 'POST' \
  'https://customer.zenya.work/api/tokens' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \

  -H 'x-api-version: 5' \
  -d '{
  "api_key": "<api key>",
  "username": "<login code of a user>"
}'
```

The response is a token string.

```curl
curl --location --request POST 'https://customer.zenya.work/api/bearer_tokens' \
--header 'accept: application/json' \
--header 'x-api-version: 5' \
--header 'Authorization: token <token>'
```

The response is a Bearer Token string.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen.)
[ex_sliding]: <../Examples/Authentication/Sliding token expiration with fetch.js>
[BearerTokenExample]: <../Examples/Authentication/BearerTokenExample.js>
[tokenexample]: <../Examples/Authentication/Token authentication with fetch.js>
[oathexample]: <../Examples/Authentication/OAuth with fetch.js>
[authcodeexample]: <../Examples/Authentication/OAuth authorization code with fetch.js>
[basicexample]: <../Examples/Authentication/Basic authentication with fetch.js>
[oauth2standard]: <https://oauth.net/2/>
[pkcegenerator]: <https://tonyxu-io.github.io/pkce-generator/>
