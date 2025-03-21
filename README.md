# Overview
This document describes the resources that make up the Zenya API v5. This document is structured in a way that the most important information is presented first.

## Base url

All API access is possible over the same protocols as the product. So if your url looks like `https://zenya.yourcompany.nl`, your api url would look like this `https://zenya.yourcompany.nl/api`;

## Versioning
We encourage to explicitly define the api version via any of the following ways:
- Via a header: `X-Api-Version: 5`.
- Via the query string: `api/card_files/cards/1?api-version=5`.
- Via the accept header: `Accept: application/vnd.iprova.api+json+api-version=5`.

By default, all requests receive the default version of the Zenya API which is currently v4, but we encourage you to use the newest version of the api.

The major versions are not backwards compatible with older major versions. The changelog can be found at [this location][change_log], it contains information about the changes and also will describe candidates which are marked to become deprecated in a following major version.

## Authentication
There are five ways to authenticate yourself. When the authentication fails a 401 Unauthorized HTTP status code wil be returned. The ways to authenticate are documenten in [Authentication][authentication].

- Via an app registration (preferred authentication method for trusted applications)
- Via JWT bearer token (preferred way of connecting as a specific user)
- Via basic credentials
- Via token (preferred authentication method to login via an url to a Zenya page)
- Via cookie

## Schema

All resources and attributes of the resources are snake cased. Dates are returned in format `yyyyMMdd`, times are returned in format `HHmmss` and date with times are returned in format `yyyyMMddHHmmss`. Dates are always in the UTC time zone and in ISO format. If an attribute is nullable and the value is null, the attribute will not be present in the resource.
```javascript
var data_type =
{
  "data_type_id" : 512,
  "singular_name" : "Car",
  "plural_name" : "Cars",
  "active" : true,
  "inserted_date" : 19830409, // yyyyMMdd
  "start_datetime" : 200604240830, // yyyyMMddHHmmss
  "publish_time" : 091659, // HHmmss
  // "archived" : null // No returned, because null
};
```

Depending on the context of the routes less attributes could be return. For example when getting a resource the user has no or less permissions on, or when getting a list of resources. We do strive for the same resource in different contexts looking the same, except for missing attributes. In some cases you need to set an `include_` flag to true to get the information. This could be because the data could be big (for example a possible huge image in base64) or a heavy call on our system (for example sub resources like custom fields)

## Parameters
Many API methods take optional parameters. For GET requests, any parameters not specified as a segment in the path can be passed as an HTTP query string parameter. For example: `GET api/objects?include_image=true`.

For POST, PUT, PATCH, and DELETE requests the model parameter should be put in the body. They should be encoded as JSON with a Content-Type of 'application/json'. For example: `POST api/card_files/card/1/image` with body `'{"name":"Hammer", "base64":""}'`.

## HTTP Verbs
The following verbs are used in the API. See the [Verbs][verbs] page for further information.

| Verb | Explanation |
|--|--|
| **GET** | Used for retrieving resources. |
| **POST** | Used for creating resources. |
| **PUT** | Used for replacing resources.|
| **PATCH** | Used for updating resources with partial data. |
| **DELETE** | Used for deleting resources. |
| **HEAD** | Used retrieving only the headers of the GET request. |

## HTTP Status Codes
The following HTTP status codes can be returned by the services. Check the documentation to know which status code will be returned by which route.

|Code|Name|Explanation|
|--|--|--|
|**200**|OK|Always returned when route did not create resources and a response payload is returned.|
|**201**|Created|Returned when one or more resources are created.|
|**202**|Accepted|Asynchronous route is accepted. Used for fire and forget routes.|
|**204**|No Content|Returned when route did not create resources and no response payload returned.|
|**206**|Partial Content|Returned when streaming a file as a response of a call, and the servers sends a partial response.|
|**304**|Not Modified|Return when the resource requested hasn't been updated since the last time you accessed it.
|**400**|Bad Request|Returned when any of the input is wrong or a combination of input would cause an illegal operation.|
|**401**|Unauthorized|Returned when anything with the credentials is wrong. It is always possible to receive this status code.|
|**403**|Forbidden|Returned when the authenticated user is forbidden to use a certain aspect of a route.|
|**404**|Not Found|Returned when a resource could not be found.|
|**429**|Too Many Requests|Some routes can return a 429 when you have sent too many requests to them.|
|**500**|Internal Server Error|Returned whenever this occurs something is wrong with the API. It is always possible to receive this status code.|

## Client Errors
When a 4xx or 500 HTTP status code is returned the response body contains a json object describing the error as specific as possible without exposing too much information. See the [Client errors][client_errors] page for detailed information per client error.


## Icons
Resources can have an icon. These are represented in two types: an icon dto or the name of the icon.

The icon dto contains the name, color and which icon pack is used. 

When only the name is used, the route documentation or the property name should indicate the variant used. When both are not supplied, you may assume MI and MDI to be the default.

The following packs are used
- [Material Icon](https://fonts.google.com/icons/)
- [Material design icon](https://materialdesignicons.com/)
- [Material symbol](https://fonts.google.com/icons?icon.set=Material+Symbols&icon.style=Sharp)

## Filtering
Filtering is implemented in two ways. Both are RESTful and will filter in completely the same way. The difference is that one uses querystring parameters for each filter rule and the other one stores a filter which can be applied to a follow up request.

If a route filtering it will always have implemented both ways.

If there are multiple filter rules, they are applied as an "and" operator.

### Filtering via the querystring
Filtering via the querystring is as easy as setting the optional filter rules. The notation is always `rule_name=value`.

**Example**: `GET api/entities?name=JCI&entity_ids=1,2,3,4`

The value has a certain notation for its type.

| Type | Format | Examples
|--|--|--|
| **text** | text value | name=John%20Doe
| **list** | Comma separated values | entity_ids=1,2,3,4

This is very easy, but can be limiting when you want to filter on a lot of values. In that case you can use the stored filter mechanism.

### Filtering via stored filter
Using the filter mechanism consists of two steps: creating the filter and retrieving the items with the filter id. The paths always consists of the normal route used to filter via the querystring appended  with "/filter".

`POST api/entities/filter` with a filter object as post data:

```javascript
{
  "entity_ids" : [1,2,3],
  "name": "John Doe"
}
```

This returns a Created (201) response with the id of the filter and 'location' header with the route for retrieving the entities using the filter:
`GET api/enitities/filter/9289c2bd-26bc-422e-ba68-3d2768489bea`

## Pagination
Some api paths have been implemented using paginated results. This means that when getting the results, you only get a subset of the result, representing a single page of results. You can influence the data being returned by using the "limit" and "offset" querystring parameters.

**Example**: `GET api/card_files/1/cards?limit=50&offset=10`

This call will return (at most) 50 cards, starting at card number 11.

The following metadata will be included in the result:

- The total number of results of the request (that would be returned if the result was not paginated)
- The used limit parameter
- The used offset parameter, determining how many results in the entire resultset to skip in the returned result
- The amount of results returned

By default the paging metadata will be returned as custom http response headers:

```bash
HTTP/1.1 200 OK
Date: Thu, 02 Mar 2017 17:27:06 GMT
Status: 200 OK
X-Pagination-Limit: 50
X-Pagination-Offset: 10
X-Pagination-Returned: 50
X-Pagination-Total: 1048
```

However, because some proxy servers don't allow unknown headers and remove them from the response, and some client might not be able to access the response headers it is possible to get this metadata in the actual result of the call. This can be done by passing the `envelope` query string parameter and setting it to true.

**Example**: `GET api/objects?limit=50&offset=10&envelope=true`

The result of this call will always be a generic wrapping envelope. This envelope contains two properties: "data" and "pagination". "data" contains the actual result of the request, and "pagination" contains the metadata about the pagination that would normally be present in the response headers:

```javascript
{
  "data" : [the actual result array]
  "pagination": {
    "limit": 3,
    "offset": 0,
    "returned": 3,
    "total": 6
  }
}
```

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen.)
[change_log]: <Changelog.md>

[verbs]: <Documentation/Verbs.md>
[client_errors]:<Documentation/ClientErrors.md>
