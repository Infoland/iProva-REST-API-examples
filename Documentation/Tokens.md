# Tokens
Tokens are the preferred way of communicating with the API for trusted applications. A token is a time limited string that represents an authenticated user, that can be passed to the API to authenticate the current request.

## Api-Keys and tokens
Tokens are linked to an api-key. api-keys can be created within the product and are needed to access the API. Tokens can only be generated using an api-key for which "token generation" has been enabled in the product. The usage of the API key can be restricted on a set of IP Address ranges (IPv4 and IPv6) and/or on a set of user names.

Tokens are time limited. This means they expire after a short amount of time. This means that you cannot infinitely re-use a token. Each time you perform a call the API you first need to get a new token and use this newly generated token to make your call.

Tokens can be requested by using the tokens API:

**Example**: `POST api/tokens`  with body `{"api_key": "YourAPIKey", "username":"j.t.kirk"}`. 

For more information see the documentation of the token API.

For a real life example of calling the API using a token, see the authentication examples.

## Sliding expiration
Tokens also support sliding expiration. To enable sliding expiration, you need to enable this option for your api-key in the product. Once sliding expiration is enabled, each call to the API using a generated token will reset the expiration time-out for the token. Once the token has expired, it will never become "active" again by calling the API again, and you need to request a new token. For an example on how to use sliding expiration see [Examples][ex_sliding]

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen.)
[ex_insert_card]: <../Examples/Cards/Create card with jQuery.js>
[ex_sliding]: <../Examples/Authentication//Sliding token expiration with jQuery.js>
