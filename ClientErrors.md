# Client errors
This page describes the supported client errors in more detail.

## 400 Bad Request
Returned when any of the input is wrong or a combination of input would cause an illegal operation. Most of the time the reason phrase will be altered to present extra information to the consumer so the problem can be pin pointed.

 - When an argument is incorrect the reason phrase will be altered and nothing will be in the body
 - When an argument contains invalid fields the reason phrase will be altered, but also the body will be filled with extra information.
```javascript
[
  "text should be filled"
]
```

## 401 Unauthorized
Returned when anything with the credentials is wrong. It is always possible to receive this status code. No extra information will be presented in the body.

## 403 Forbidden
Returned when the authenticated user is forbidden to use a certain aspect of a route. The reason phrase is sometimes altered to give the consumer more information about what went wrong, as long as that does not cause a security risk.

## 404 Not Found
Returned when a resource could not be found. Most of the time the reason phrase is altered to give the consumer more information about what could not be found.

## 500 Internal server error
Returned when something is wrong with the API. The reason phrase will never be altered. The body will contain an error_code. The error_code returned can be used to look up the error in iProva.

```javascript
{
    "message":"Internal server occurred",
    "error_code": "3fb901f5-7330-4be6-805e-59d1d1a2fd07"
}
```