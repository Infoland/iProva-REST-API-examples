# Filtering in Our API

We have three ways to filter in our API:

1. Filtering via the query string using $filter in an OData style
2. Filtering via the query string with specific properties
3. Filtering via a previously stored filter

Some resources support multiple ways of filtering; see the OpenAPI documentation for what is exactly possible.

## Filtering via the query string using $filter in an OData style

Filtering via the query string using `$filter` follows the OData style. This allows for more complex filtering expressions, such as `or` operators, parentheses between predicate operations, or `lt`, `gt`, `contains(property, 'value')`. This is the only way to filter on values of custom fields.

- **Example filtering on attributes**: `GET api/entities?$filter=(name eq 'John Doe' or contains(name, 'Jane')) and age lt 42`
- **Example filtering on a custom text field**: `GET api/entities?$filter=custom_field123 eq 'John Doe'`

Be aware that our API is not an OData API and we do not support all OData functionalities. So always check the OpenApi documention for what is possible.

### Supported data types and operators

| Data Type | Operators | Examples |
|-----------|-----------|----------|
| text | `eq`, `ne`, `contains`, `startswith`, `endswith`, `substring`, `length` | `contains(name, 'Jane')`, `name eq 'John Doe'`, `substring(name, 1, 4)` |
| formatted_text | `eq`, `ne`, `contains`, `startswith`, `endswith`, `substring`, `length` | `length(formatted_text) gt 20`, `formatted_text eq '<html-editor><b>abc</b></html-editor>'`, `endswith(formatted_text, 'bc</html-editor>')` |
| email_address | `eq`, `ne`, `contains`, `startswith`, `endswith`, `substring`, `length` | `contains(email_address, 'abc.com')`, `email_address eq 'info@abc.nl'`, `startswith(email_address, 'info')` |
| number | `eq`, `ne`, `gt`, `ge`, `lt`, `le` | `age lt 42`, `age gt 18`, `age eq 30` |
| date / datetime | `eq`, `ne`, `gt`, `ge`,`lt`, `le`, `year`, `month`, `day`, `hour`, `minute`, `second`, `date` | `modified_date_time ge 2026-07-01T00:00:00Z`, `modified_date_time ge 2026-07-01T08:30:00+02:00`, `date(modified_date_time) eq 2026-07-23`, `month(modified_date_time) in (6, 7, 8)` |
| checkbox | `eq`, `ne` | `is_active eq true`, `is_active ne false` |
| organizational_unit | `eq`, `ne`, `contains`, `startswith`, `endswith`, `substring`, `length` | `organizational_unit/any(i: i/name eq 'Sales')`, `organizational_unit/any(i: contains(i/name, 'Sales'))` |
| user | `eq`, `ne`, `contains`, `startswith`, `endswith`, `substring`, `length` | `user/any(i: i/user_name eq 'John Doe')`, `user/any(i: i/user_id ne 'A65080EC-6C03-4E00-8E50-E4608E70CDF8')`, `user/any(i: contains(i/user_name, 'Joh'))` |
| attachments | `eq`, `ne`, `contains`, `startswith`, `endswith`, `substring`, `length` | `attachments/any(i: startswith(i/file_name, 'http'))`, `attachments/any(i: i/attachment_id eq '2466dee5-df41-496c-bb61-1066576ba0a3')` |
| hyperlinks | `eq`, `ne`, `contains`, `startswith`, `endswith`, `substring`, `length` | `hyperlinks/any(i: i/hyperlink_id eq '7ff9871f-4a35-44ed-8ed5-9d375d0fb6f1')`, `hyperlinks/any(i: contains(i/description, 'Portal'))` |
| data_type | `eq`, `ne`, `contains`, `startswith`, `endswith`, `substring`, `length` | `data_type/any(i: i/object_id eq 1234)`, `data_type/any(i: contains(i/display_name, 'some'))` |
| position | `eq`, `ne`, `contains`, `startswith`, `endswith`, `substring`, `length` | `position/any(i: i/position_id eq '56d136ad-5bf9-432f-921c-2222e499e9ad')`, `position/any(i: i/position_name eq 'Development')` |

## Filtering via the query string with specific properties

Filtering via the query string can be done by adding the supported filter rule name with value to the query string. The notation is always `rule_name=value`. The OpenAPI documentation shows which filter rules are supported.

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
