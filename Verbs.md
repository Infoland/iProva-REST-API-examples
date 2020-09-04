# Verbs
This page defines all the HTTP verbs which can be used in the API.

## Usage 
The API strives to only implement routes which are unique. So when a PATCH route does exactly the same as the PUT route we will only support one of those.

## Idempotence
The API strives to be idempotent for the verbs which should be idempotent. There are some cases where we had to defer because of the actions which are executed. 

For example: when updating the hyperlinks field of a card new hyperlinks are created each time the PUT statement is executed. This is because the hyperlinks do not have an identifier and there is no route to manage the hyperlinks yet. 

To learn more about idempotence visit this [webpage][idempontency].

## GET
The GET verb is used to retrieve resources. It will return a 200 OK With Content status code on succes.

The GET verb is idempotent in all cases. 

## POST
The POST verb is used to create a new resource. It will return a 201 Created with the route the new resource in the header of the response. The response body contains the id of the created identity:
```javascript
  "b3af58cb-edac-43ed-a357-45585e8860ec"
```
Some POSTs support disabling strict validation with a parameter called "strict_validation". If this parameter is set to False, the response body contains the id of the created identity along with validation messages:
```javascript
  {
    "created_identifier": "b3af58cb-edac-43ed-a357-45585e8860ec",
    "messages": 
    [
      {
        "code": "missing_value",
        "message": "no value was specified for field with id 123",
        "identifier": "123"
      },
      {
        "code": "invalid_value",
        "message": "invalid value was specified for field with id 456",
        "identifier": "456"
      },
      {
        "code": "invalid_field",
        "message": "invalid field with id 789",
        "identifier": "789"
      }
    ]
  }
```
See the [validation codes][validationcodes] page for further information about the validation codes.

The POST verb is not idempotent by definition.

We do not use the POST verb to fully update resources

## PATCH
The PATCH verb is used to partially update a resource. Only attributes which are sent in the request are updated. When an attribute is not sent it will not by updated. The request will return 204 No Content status codes on succes.

For instance, a card resource has multiple fields. A PATCH request may accept one or more of the attributes to update the resource. 

The PATCH verb is idempotent in the API, except in some cases, see the "idempotence" chapter.

### PUT
The PUT verb is used to fully update or replace a resource. It will return 204 No Content status codes on success.

The PUT verb is idempotent, except in some cases, see the "idempotence" chapter.

## DELETE
The DELETE verb is used to delete one or more resources

The DELETE verb is idempotent.

[idempontency]:<http://www.restapitutorial.com/lessons/idempotency.html>
[validationcodes]: <ValidationCodes.md>
