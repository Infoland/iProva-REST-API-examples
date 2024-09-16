## Overview

This describes our global field system which is used in Risks, Objects and more places


## Field input format
The below table contains the format in which fields can be set by using the following routes:
- `POST` /api/XXX
- `PUT` /api/XXX/custom_field_values

|FieldType| Allowed formats | Example(s) |
|--|--|--|
|Attachment|Guid, Guid[], attachment[] or 'mixed array'|<pre>"value": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151"</pre> or <br><br><pre>"value": ["EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151", "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152"]</pre> or <br><br><pre>"value": [<br>{<br>  "attachment_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151"<br>},<br>{<br>  "attachment_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152"}]</pre> or <br><br><pre>"value": [<br>"EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151", <br>"EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152"<br>{<br>  "attachment_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D153",>},<br>{<br>  "attachment_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D154",<br>}]</pre> Property file_name must contain _name_ and **extension**, e.g. _test_**.txt**
|Boolean|bool|`value:true` or `"value":false`
|Card file|int or int[]|`value:10` or `value: [10,11]`
|Date|string in yyyyMMdd format|`"value":"20211212"`
|EmailAddress|string in email address format|`"value":"somename@domain.com"`
|Formatted Text|string|`"value":"Some text with <b>markup</b>"`
|Hyperlink|hyperlink_item_value[]|<pre>"value": [<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "description":"Description of hyperlink 1"<br>},<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "description":"Description of hyperlink 2"<br>}]</pre>
|List|int, int[], string, string[], 'mixed array'|`value:[1]` or `"value": [2,"other value"]` or `"value": [2,"named list option1","named list option2"]` or `"value":1`
|Numeric|a numeric value|`value: 5` or `"value": 6.67`
|Organization unit|int or int[]|`value:10` or `value: [10,11]`
|Position|Guid[]|<pre>"value": [<br>{<br>  "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151"</br>}]</pre>
|Text|string|`value: "some text"`
|User|Guid[]|<pre>"value": [<br>{<br>  "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151"</br>}]</pre>

## Field output format
The below table contains the format in which fields are returned by the `GET` /api/XXX/{id}?include_all_custom_field_values routes

| FieldType | Output example |
| -- | -- |
| Attachment | <pre>"value": [<br>{<br>  "attachment_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "file_name":"Attachment 1.png"<br>},<br>{<br>  "attachment_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "file_name":"Attachment 2.zip"<br>}]</pre> |
|AutoNumber|`"value": 102`
| Boolean | `value:true` or `"value":false` |
|Card file|<pre>"value": [<br>{<br>  "card_id": 12,<br>  "display_name":"Card 12 display name"<br>},<br>{<br>  "card_id": 3,<br>  "display_name":"Card 3 display name"<br>}]</pre>
|Date|`"value":"20211212"`
|EmailAddress|`"value":"somename@domain.com"`
|Formatted Text|`"value":"Some text with <b>markup</b>"`
|Hyperlink|<pre>"value": [<br>{<br>  "hyperlink_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "description":"Description of hyperlink 1"<br>},<br>{<br>  "hyperlink_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "description":"Description of hyperlink 2"<br>}]</pre>
|List|<pre>"value": [<br>{<br>  "list_option_id": 3,<br>  "name":"option 1"<br>},<br>{<br>  "name":"other value"<br>}]</pre>
|Numeric|`"value": 6.67`
|Organization unit|<pre>"value": [<br>{<br>  "organization_unit_id": 1,<br>  "name":"OranizationUnitName"<br>},<br>{<br>  "organization_unit_id": 3,<br>  "name":"OranizationUnitName"<br>}]</pre>
|Position|<pre>"value": [<br>{<br>  "position_id": 3,<br>  "position_name":"position 1"<br>},<br>{<br>  "position_id": 25,<br>  "position_name":"position 2"<br>}]</pre>
|Text|`value: "some text"`
|User|<pre>"value": [<br>{<br>  "user_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "user_name":"user a"<br>},<br>{<br>  "user_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "user_name":"user b"<br>}]</pre>
