# JWT Bearer Tokens
JWT Bearer Tokens are the preferred way of communicating with the API when authenticating specific users. A Bearer token is a time limited string that represents an authenticated user, that can be passed to the API to authenticate the current request.

Bearer tokens are time limited. This means they expire over time (they have a fixed lifetime of 2 weeks). This means that you cannot infinitely re-use a token. However, you can refresh a bearer token by fetching a new bearer token from the API

Tokens can be requested by using the bearer_tokens API, while using a credentials authorization header:

**Example**: `POST api/bearer_tokens` with Authorization header `credentials u:j.t.kirk pwd:P@$$w0rd`. 
This will return a bearer token for the user j.t.kirk. All subsequent calls to the api can now be authenticated using the http header: `bearer <the_returned_token>`

For more information see the documentation of the tokens API.

For a real life example of calling the API using a token, see [Examples][ex_insert_card]

## Sliding expiration
Bearer Tokens have a fixed expiration date of 2 weeks after generation. However, using the bearer token, you can request a new bearer token. So by getting a new bearer token within 2 weeks, it is possible to implement your own sliding expiration