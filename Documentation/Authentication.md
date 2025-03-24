
# API Authentication

Our API uses Bearer Token authentication to secure endpoints. Clients must include a valid token in the `Authorization` header of each request, formatted as `Authorization: Bearer <token>`.

Example:
```
curl -X GET https://customer.zenya.work/api/<some_resources>> \
  -H "Authorization: Bearer <generated-token>"
```

[More information](BearerTokens.md)

## Obtaining a Bearer Token

There are 2 methods to generate a bearer token:
- Use OAuth Token Endpoint
- Use Bearer Token end point
  - Basic HTTP Authentication
  - One Time Password token


### 1. OAuth Token Endpoint

Currently you can only use end point if you have created an "App registration" in Zenya for "machine to machine" communication.

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

  Exampe:
```curl
curl -X 'POST' \
  'https://customer.zenya.work/api/oauth/token' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'x-api-version: 5' \
  -d 'grant_type=client_credentials&client_id=d4fd4842-e80e-417f-b5e5-78f5e413448d&client_secret=%23S8rKlE%2BVJW%21e%29KNbHWSi%23%26-6s52%26u_PqAUoS2Q%2BDGtEYhd%5Eg%2BjxbEaFvF3rZOJH'
```

 
 The response is a bearer token string.

### 2. Basic HTTP Authentication (for user to machine authentication)
- **Endpoint**: `POST /bearer_tokens`
- **Authentication**: Basic HTTP Auth (username/password) or OTP (Token)
- **Request Body**: None required
- **Response**: a string with the bearer token

Submit your credentials via Basic Auth to receive a bearer token. The header should contain the string "Basic" followed by a base64 encoded string containing the credentials in the following format <username>:<password>. See also https://datatracker.ietf.org/doc/html/rfc7617


Example of getting a bearer token with basic http authentication
```curl
curl --location --request POST 'https://customer.zenya.work/api/bearer_tokens' \
--header 'accept: application/json' \
--header 'x-api-version: 5' \
--header 'Authorization: Basic =123455vxvxcv'
```

There is also an older system which is used to generate something like an "One Time Password" (OTP), an token based on an api key and a user name. This is used in cases that a system wants to automaticly log a user into Zenya. [More information](Tokens.md)

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

The response is a token string.

```curl
curl --location --request POST 'https://customer.zenya.work/api/bearer_tokens' \
--header 'accept: application/json' \
--header 'x-api-version: 5' \
--header 'Authorization: token <token>'
```

The response is a bearer token string.