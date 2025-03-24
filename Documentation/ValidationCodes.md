# Validation Codes
This page describes the validation codes in more detail.
These validation codes can be returned returned in the response body of a POST.

## Missing Value
Indicates that a value is required but was not specified in the request.
```javascript
      {
        "code": "missing_value",
        "message": "no value was specified for field with id 123",
        "identifier": "123"
      }
```

## Invalid Value
Indicates that a value is invalid according its type or business rules.
```javascript
      {
        "code": "invalid_value",
        "message": "invalid value was specified for field with id 456",
        "identifier": "456"
      }
```

## Invalid Field
Indicates that an invalid field was specified.
```javascript
      {
        "code": "invalid_field",
        "message": "invalid field with id 789",
        "identifier": "789"
      }
```
