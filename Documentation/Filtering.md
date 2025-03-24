# Filtering
Filtering is implemented in two ways. Both are RESTful and will filter in completely the same way. The difference is that one uses querystring parameters for each filter rule and the other one stores a filter which can be applied to a follow up request. If there are multiple filter rules, they are applied as an "and" operator.

# Filtering via the querystring
Filtering via the querystring is as easy as setting the optional filter rules. The notation is always `rule_name=value`.

**Example**: `GET api/entities?name=JCI&entity_ids=1,2,3,4`

The value has a certain notation for its type.

| Type | Format | Examples
|--|--|--|
| **text** | text value | name=John%20Doe
| **list** | Comma separated values | entity_ids=1,2,3,4

This is very easy, but can be limiting when you want to filter on a lot of values. In that case you can use the stored filter mechanism.

# Filtering via stored filter
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