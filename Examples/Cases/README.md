## Overview

This folder contains examples of creating new cases or updating the values of an existing case via the Zenya API. The format of the `value` property of a field differs per field type. Most of these are the same as the fields in the global field system [described here](../Fields/README.md)

Below you can see format examples of input and output per field type which differ from the global field system.


## Field input format
The below table contains the format in which fields can be set by using the following routes:
- `POST` /api/cases
- `PUT` /api/cases/{case_id}/fields/{field_id}

|FieldType| Allowed formats | Example(s) |
|--|--|--|
|Attachment|Guid, Guid[], attachment_item_value[] or 'mixed array'|<pre>"value": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151"</pre> or <br><br><pre>"value": ["EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151", "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152"]</pre> or <br><br><pre>"value": [<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "file_name":"Attachment 1.png"<br>},<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "file_name":"Attachment 2.txt"<br>}]</pre> or <br><br><pre>"value": [<br>"EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151", <br>"EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152"<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D153",<br>  "file_name":"Attachment 3.png"<br>},<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D154",<br>  "file_name":"Attachment 4.txt"<br>}]</pre> Property file_name must contain _name_ and **extension**, e.g. _test_**.txt**
|Formula|-|Formula is not a settable field. It is calculated according to the settings of the field
|Framework item|framework_item_value[]|<pre>"value": [<br>{<br>  "framework_item_id": 1,<br>  "include_sub_items":false<br>},<br>{<br>  "framework_item_id": 3,<br>  "include_sub_items":true<br>}]</pre>
|Hierarchical list|int, int[], string, string[], 'mixed array'|`value:[1]` or `"value": [2,"named list option"]` or ``"value":1`` or `"value":"named list option"`
|LookupField|-|LookupField is not a settable field. It doesn't have a value
|NumericList|int or string|`value: 5` or `"value": "option name"`
|Organization unit|int or int[]|`value:10` or `value: [10,11]`
|Period|-|Period is not a settable field. It is calculated according to the settings of the field
|Risk matrix|-|Risk matrix is not a settable field. It is calculated according to the settings of the field
|Score matrix 3D|-|Score matrix 3D is not a settable field. It is calculated according to the settings of the field
|Time|string in time format (hh:mm)|`"value":"12:31"`
"EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151"</br>}]</pre>
|WebPage|string in format `<scheme>://<host>/<path>`|`"value":"https://www.zenya-software.com/"`

## Field output format
The below table contains the format in which fields are returned by the `GET` /api/cases/{case_id} route

| FieldType | Output example |
| -- | -- |
| Attachment | <pre>"value": [<br>{<br>  "attachment_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "file_name":"Attachment 1.png"<br>},<br>{<br>  "attachment_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "file_name":"Attachment 2.zip"<br>}]</pre> |
|Formula|`"value":12.3`
|Framework item|<pre>"value": [<br>{<br>  "framework_item_id": 1,<br>  "title":"framework item 2 title",<br>  "full_number":"1.2",<br>  "framework_name":"framework name",<br>  "include_sub_items":false<br>},<br>{<br>  "framework_item_id": 2,<br>  "title":"framework item 2 title",<br>  "full_number":"2.3.4",<br>  "framework_name":"framework name",<br>  "include_sub_items":true<br>}]</pre>
|Hierarchical list|<pre>"value": [<br>{<br>  "list_option_id": 3,<br>  "name":"option 1"<br>},<br>{<br>  "list_option_id": 25,<br>  "name":"option 2"<br>}]</pre>
|LookupField|LookupField doesn't have a value
|NumericList|<pre>"value": {<br>  "list_option_id": 3,<br>  "name":"option 1"<br>}</pre>
|Period|<pre>"value": {<br>  "value": 3,<br>  "period_unit":"days"<br>}</pre>
|Risk matrix|<pre>"value": {<br>  "value": 3,<br>  "text":"Section name"<br>}</pre>
|Score matrix 3D|<pre>"value": {<br>  "value": 3,<br>  "text":"Section name"<br>}</pre>
Time|`"value":"12:31"`
|WebPage|`"value":"https://www.zenya-software.com/"`
