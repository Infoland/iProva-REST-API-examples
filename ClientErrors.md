# Client errors
This page describes the supported client errors in more detail.

## 400 Bad Request
Returned when any of the input is wrong or a combination of input would cause an illegal operation. Most of the time the response message will contain a property "title" to present extra information to the consumer so the problem can be pinpointed.

 - When an argument is incorrect the response body will contain a problem+json object (see [RFC7807](https://tools.ietf.org/html/rfc7807)) with the error details
```javascript
{
  "type": "https://iprova.nl/probs/badrequest",
  "title": "user_id was not valid"
}
```

A 400 will be returned when the body contains something which cannot be found.

A 400 can be returned when the product is in "read only" mode and the call would have manipulated the resource.

## 401 Unauthorized
Returned when anything with the credentials is wrong. It is always possible to receive this status code. No extra information will be presented in the body.

## 403 Forbidden
Returned when the authenticated user is forbidden to use a certain aspect of a route. Sometimes the response body contains a property "title" to give the consumer more information about what went wrong, as long as that does not cause a security risk.
```javascript
{
  "type": "https://iprova.nl/probs/forbidden",
  "title": "user is not authorized to delete user"
}
```

## 404 Not Found
Returned when a resource could not be found. Most of the time the response message will contain a property "title" to give the consumer more information about what could not be found.
```javascript
{
  "type": "https://iprova.nl/probs/notfound",
  "title": "user not found"
}
```

A 404 is not returned when something passed in the body is not found, in that case a 400 is returned.

A 404 is not returned when the logged in user does not have read permissions, in that case a 403 should be returned.

## 500 Internal server error
Returned when something is wrong with the API. The reason phrase will never be altered. The body will contain an error_code. The error_code returned can be used to look up the error in the product.

```javascript
{
    "message":"Internal server occurred",
    "error_code": "3fb901f5-7330-4be6-805e-59d1d1a2fd07",
    "error_date": "20180216143520123"
}
```
