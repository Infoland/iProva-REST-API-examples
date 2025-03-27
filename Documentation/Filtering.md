# Filtering in Our API

We have three ways to filter in our API:

1. Filtering via the query string using $filter in an OData style
2. Filtering via the query string with specific properties
3. Filtering via a previously stored filter

Some resources support multiple ways of filtering; see the OpenAPI documentation for what is exactly possible.

## Filtering via the query string using $filter in an OData style

Filtering via the query string using `$filter` follows the OData style. This allows for more complex filtering expressions, such as `or` operators, parentheses between predicate operations, or `lt`, `gt`, `contains(property, 'value')`.

**Example**: `GET api/entities?$filter=(name eq 'John Doe' or contains(name, 'Jane')) and age lt 42`

Be aware that our API is not an OData API and we do not support all OData functionalities.

### Supported Data Types and Operators

| Data Type | Operators | Examples |
|-----------|-----------|----------|
| text | `contains`, `eq`, `substring` | `contains(name, 'Jane')`, `name eq 'John Doe'`, `substring(name, 1, 4)` |
| number | `lt`, `gt`, `eq` | `age lt 42`, `age gt 18`, `age eq 30` |

## Filtering via the query string with specific properties

Filtering via the query string is as easy as setting the optional filter rules. The notation is always `rule_name=value`.

**Example**: `GET api/entities?name=JCI&entity_ids=1,2,3,4`

The value has a certain notation for its type.

| Type | Format | Examples |
|------|--------|----------|
| text | text value | `name=John%20Doe` |
| list | Comma separated values | `entity_ids=1,2,3,4` |

This method is very easy but can be limiting when you want to filter on a lot of values. In that case, you can use the stored filter mechanism.

## Filtering via a previously stored filter

Using the stored filter mechanism consists of two steps: creating the filter and retrieving the items with the filter id. The paths always consist of the normal route used to filter via the query string appended with `/filter`.

1. **Create the filter**: `POST api/entities/filter` with a filter object as post data:

    ```json
    {
      "entity_ids": [1, 2, 3],
      "name": "John Doe"
    }
    ```

    This returns a  `Created (201)` response with the id of the filter and a 'location' header with the route for retrieving the entities using the filter.

2. **Retrieve the items using the filter ID**: `GET api/entities/filter/{filter_id}`

    **Example**: `GET api/entities/filter/9289c2bd-26bc-422e-ba68-3d2768489bea`
