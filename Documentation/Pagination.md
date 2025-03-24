# Pagination
Some api paths have been implemented using paginated results. This means that when getting the results, you only get a subset of the result, representing a single page of results. You can influence the data being returned by using the "limit" and "offset" querystring parameters.

**Example**: `GET api/objects?limit=50&offset=10`

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