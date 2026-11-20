
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
2. Exchange that code for an access token and refresh token (`POST /oauth/token`).

Afterwards you can [refresh](#refreshing-a-token) the access token and [revoke](#revoking-a-token-log-off) the tokens when the user logs off.

[Example of implementation][authcodeexample].

#### PKCE code verifier & code challenge

Before starting, generate a random **code verifier** and derive a **code challenge** from it:

- `code_verifier`: a high-entropy random string (43–128 characters).
- `code_challenge`: `BASE64URL(SHA256(code_verifier))`.

You send the `code_challenge` in step 1 and prove ownership by sending the original `code_verifier` in step 2. Generate both in your app, as the [example][authcodeexample] does. For manual testing only you can use an online [PKCE generator][pkcegenerator]; never use a third-party site for real logins.

#### Step 1 — Get an authorization code

- **Endpoint**: `POST /oauth/authorize/login`
- **Content-Type**: `application/json`
- **Request Body Parameters**:
  - `login_code`: the user's login code
  - `password`: the user's password
  - `client_id`: the public app registration id (a Guid)
  - `redirect_uri`: must exactly match one of the redirect uris registered for the app registration
  - `code_challenge`: the PKCE code challenge derived above
  - `two_factor_code` (optional): the user's two-factor code, when two-factor authentication is required
  - `skip_two_factor` (optional, default `false`): postpones setting up two-factor authentication; only honoured while the user's two-factor setup deadline has not passed
  - `new_password` (optional): the new password, when the user must change their password before logging in
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
  "login_code": "j.doe",
  "password": "S3cr3tP@ssw0rd",
  "client_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "redirect_uri": "https://app.example.com/callback",
  "code_challenge": "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
}'
```

Errors are returned as a problem details response with the OAuth `error` (and sometimes `error_description`) properties:
- `400 invalid_client` — `client_id` is not a known public app registration, or `redirect_uri` does not match a registered redirect uri.
- `401` — login did not succeed. `error` is one of:
  - `invalid_credentials` — the login code or password is wrong.
  - `two_factor_required` — repeat the request with `two_factor_code`. While the user's two-factor setup grace period is open, the response also contains `two_factor_setup_deadline`, and you may send `skip_two_factor: true` instead.
  - `two_factor_code_invalid` — the two-factor code is wrong.
  - `password_change_required` — repeat the request with `new_password`.
  - `two_factor_and_password_change_required` — both of the above.
  - `invalid_new_password` — the new password was refused; `reason` is `new_password_same_as_old` or `password_not_strong_enough`.
  - `inactive_user`, `invalid_user_ip_address`, `login_not_permitted` — the user may not log in.
- `429 too_many_attempts` — 5 failed attempts for this account within a minute; wait before trying again. Responses that ask for an extra step (two-factor code, password change) do not count as failed attempts.

#### Step 2 — Exchange the code for a token

- **Endpoint**: `POST /oauth/token`
- **Content-Type**: `application/x-www-form-urlencoded`
- **Request Body Parameters**:
  - `grant_type`: "authorization_code"
  - `client_id`: the same public app registration id used in step 1
  - `code`: the authorization code from step 1
  - `redirect_uri`: must match the value used in step 1
  - `code_verifier`: the original PKCE code verifier
  - `set_cookie` (optional, default `false`): see [Browser session cookies](#browser-session-cookies-set_cookie) below
  - `persistent_cookie` (optional, default `false`): only used together with `set_cookie`
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

The returned `access_token` is a JWT identical in form to the one issued by the client credentials flow, and is used the same way (`Authorization: Bearer <token>`). It is valid for 10 minutes (`expires_in` is in seconds); use the refresh token to get a new access token. The refresh token is valid for 90 days.

Error responses (all `400`):
- `invalid_grant` — the code is invalid, expired, already used, issued for a different client, the `redirect_uri` does not match, or the `code_verifier` does not match the `code_challenge`.
- `invalid_request` — a required parameter (`code`, `redirect_uri`, `code_verifier`) is missing, `client_id` is not a Guid, `set_cookie` was sent from another origin, or a `client_secret` was supplied.

For security, an unknown code and a code issued for a different client both return the same generic `invalid_grant` "code is invalid or expired" message, so the endpoint does not leak whether a client is known.

#### Browser session cookies (`set_cookie`)

`set_cookie=true` is meant for Zenya's own web client. Besides returning the tokens in the body, the response then also sets the cookies for a Zenya browser session (`Authorization`, `Authorized`, `AutomaticallyLoggedIn` and an HttpOnly `RefreshToken` cookie), using a separate access and refresh token. With `persistent_cookie=true` the `RefreshToken` cookie outlives the browser session; otherwise it is a session cookie.

`set_cookie` is only accepted for the `authorization_code` grant and only on a same-origin request (a request from a page served by the Zenya environment itself); otherwise the request fails with `400`. External apps should leave it off and use the tokens from the response body.

#### Refreshing a token

Exchange the refresh token for a new access token:

- **Endpoint**: `POST /oauth/token`
- **Content-Type**: `application/x-www-form-urlencoded`
- **Request Body Parameters**:
  - `grant_type`: "refresh_token"
  - `client_id`: the public app registration id the refresh token was issued for
  - `refresh_token`: the refresh token from the previous response
- **Response**: the same as step 2, with a **new** `refresh_token`.

Refresh tokens are rotated: each one can be used only once, so always store the new refresh token from the response. A refresh token stops working when it has been used or revoked, after 90 days, when the user's password or two-factor setting changed since it was issued, when the user is no longer allowed to log in, or when `client_id` is not the (enabled) app registration it was issued for. In those cases the response is `400 invalid_grant` and the user has to log in again. A missing `refresh_token` or a `client_id` that is not a Guid gives `400 invalid_request`.

```curl
curl -X 'POST' \
  'https://customer.zenya.work/api/oauth/token' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'x-api-version: 5' \
  -d 'grant_type=refresh_token&client_id=3fa85f64-5717-4562-b3fc-2c963f66afa6&refresh_token=<refresh-token>'
```

#### Revoking a token (log off)

Revoke the tokens when the user logs off (RFC 7009). Revoke both the refresh token and the access token: an access token otherwise stays valid until it expires.

- **Endpoint**: `POST /oauth/revoke`
- **Content-Type**: `application/x-www-form-urlencoded`
- **Request Body Parameters**:
  - `token`: the refresh token or access token to revoke
  - `clear_cookie` (optional, default `false`): also revokes the refresh token in the `RefreshToken` cookie and expires the `RefreshToken` and `Authorized` cookies set by `set_cookie`
- **Response**: `200`, also for an unknown, expired or already revoked token, so the endpoint cannot be used to find out which tokens exist. Only a request without `token` fails, with `400`.

```curl
curl -X 'POST' \
  'https://customer.zenya.work/api/oauth/revoke' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'x-api-version: 5' \
  -d 'token=<refresh-token>'
```

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
