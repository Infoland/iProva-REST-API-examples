# Two factor authentication
To be able to make calls to the API with a user for which two factor authentication is enabled, you need to pass an extra Http header containing the current security code. This header is called "x-two-factor-code". The value of this header should be the current code.

To avoid having to enter a new verification code each 30 seconds, you can use the bearer_tokens route to get a bearer token for the user with two factor authentication enabled. All subsequent calls can be authenticated using bearer authorization, without having to specify a security code anymore.

# Via Credentials (Basic authentication)
If the username and password of a user are known these credentials can be directly used to authenticate the user via the Authorization header via basic authetication. The header should contain the string "Basic" followed by a base64 encoded string containing the credentials in the following format `<username>:<password>` `Authorization: Basic ai50Lmtpcms6UEAkJHcwcmQ=`. See also https://datatracker.ietf.org/doc/html/rfc7617

Of course the consumer should keep in mind that this would require the password to be sent via a http header, so only use this in combination with HTTPs.

# Via a JWT bearer token (preferred way of connecting as a specific user)
When a token is issued, you can use this token to authenticate the user. The header should contain the string "bearer" followed by the token. `Authorization: bearer <mytoken>`.

Of course the consumer should keep in mind that this would require the token to be sent via a http header, so only use this in combination with HTTPs.

For more information about JWT bearer token authentication see [Bearer Tokens][BearerTokens]

# Via a cookie
When the user is already logged in, the product has set an authentication cookie in the browser. When accessing the API when this cookie is set the API will automatically authenticate you using this cookie.


# Via Token 
The token can be sent via the Authorization header with the string "token" followed by the token id. `Authorization: token e8f66f95-7ab2-404e-b557-879788b900de`.
For more information about token authentication see [Tokens][Tokens]

## Query parameter
When you go to a Zenya url you can pass a [token][Tokens] in the url `?token=<token>` which logs you in automatically.

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen.)
[tokens]: <Tokens.md>
[BearerTokens]: <BearerTokens.md>