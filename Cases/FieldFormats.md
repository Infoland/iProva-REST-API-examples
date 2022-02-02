## Field output format

|FieldType| Output example |
|--|--|--|
|Attachment|<pre>"value": [<br>{<br>  "attachment_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "file_name":"Attachment 1.png"<br>},<br>{<br>  "attachment_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "file_name":"Attachment 2.zip"<br>}]</pre>
|Boolean|`value:true` or `"value":false`
|Card file|<pre>"value": [<br>{<br>  "card_id": 12,<br>  "display_name":"Card 12 display name"<br>},<br>{<br>  "card_id": 3,<br>  "display_name":"Card 3 display name"<br>}]</pre>
|Date|`"value":"20211212"`
|EmailAddress|`"value":"somename@domain.com"`
|Formatted Text|`"value":"Some text with <b>markup</b>"`
|Formula|`"value":12.3`
|Framework item|<pre>"value": [<br>{<br>  "framework_item_id": 1,<br>  "title":"framework item 2 title",<br>  "full_number":"1.2",<br>  "framework_name":"framework name",<br>  "include_sub_items":false<br>},<br>{<br>  "framework_item_id": 2,<br>  "title":"framework item 2 title",<br>  "full_number":"2.3.4",<br>  "framework_name":"framework name",<br>  "include_sub_items":true<br>}]</pre>
|Hierarchical list|<pre>"value": [<br>{<br>  "list_option_id": 3,<br>  "name":"option 1"<br>},<br>{<br>  "list_option_id": 25,<br>  "name":"option 2"<br>}]</pre>
|Hyperlink|<pre>"value": [<br>{<br>  "hyperlink_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "description":"Description of hyperlink 1"<br>},<br>{<br>  "hyperlink_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "description":"Description of hyperlink 2"<br>}]</pre>
|List|<pre>"value": [<br>{<br>  "list_option_id": 3,<br>  "name":"option 1"<br>},<br>{<br>  "name":"other value"<br>}]</pre>
|LookupField|LookupField doesn't have a value
|Numeric|`"value": 6.67`
|NumericList|<pre>"value": {<br>  "list_option_id": 3,<br>  "name":"option 1"<br>}</pre>
|Period|<pre>"value": {<br>  "value": 3,<br>  "period_unit":"days"<br>}</pre>
|Position|<pre>"value": [<br>{<br>  "position_id": 3,<br>  "position_name":"position 1"<br>},<br>{<br>  "position_id": 25,<br>  "position_name":"position 2"<br>}]</pre>
|Risk matrix|<pre>"value": {<br>  "value": 3,<br>  "text":"Section name"<br>}</pre>
|Score matrix 3D|<pre>"value": {<br>  "value": 3,<br>  "text":"Section name"<br>}</pre>
|Text|`value: "some text"`
|Time|`"value":"12:31"`
|User|<pre>"value": [<br>{<br>  "user_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "user_name":"user a"<br>},<br>{<br>  "user_id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "user_name":"user b"<br>}]</pre>
|WebPage|`"value":"https://www.infoland.nl/"`

## Field input format

|FieldType| Allowed formats | Example(s) |
|--|--|--|
|Attachment|Guid, Guid[], attachment_item_value[] or 'mixed array'|<pre>"value": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151"</pre> or <br><br><pre>"value": ["EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151", "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152"]</pre> or <br><br><pre>"value": [<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "file_name":"Attachment 1.png"<br>},<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "file_name":"Attachment 2.txt"<br>}]</pre> or <br><br><pre>"value": [<br>"EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151", <br>"EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152"<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D153",<br>  "file_name":"Attachment 3.png"<br>},<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D154",<br>  "file_name":"Attachment 4.txt"<br>}]</pre> Property file_name must contain _name_ and **extension**, e.g. _test_**.txt**
|Boolean|bool|`value:true` or `"value":false`
|Card file|int or int[]|`value:10` or `value: [10,11]`
|Date|string in yyyyMMdd format|`"value":"20211212"`
|EmailAddress|string in email address format|`"value":"somename@domain.com"`
|Formatted Text|string|`"value":"Some text with <b>markup</b>"`
|Formula|-|Formula is not a settable field. It is calculated according to the settings of the field
|Framework item|framework_item_value[]|<pre>"value": [<br>{<br>  "framework_item_id": 1,<br>  "include_sub_items":false<br>},<br>{<br>  "framework_item_id": 3,<br>  "include_sub_items":true<br>}]</pre>
|Hierarchical list|int, int[], string, string[], 'mixed array'|`value:[1]` or `"value": [2,"named list option"]` or ``"value":1`` or `"value":"named list option"`
|Hyperlink|hyperlink_item_value[]|<pre>"value": [<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151",<br>  "description":"Description of hyperlink 1"<br>},<br>{<br>  "id": "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D152",<br>  "description":"Description of hyperlink 2"<br>}]</pre>
|List|int, int[], string, string[], 'mixed array'|`value:[1]` or `"value": [2,"other value"]` or `"value": [2,"named list option1","named list option2"]` or `"value":1`
|LookupField|-|LookupField is not a settable field. It doesn't have a value
|Numeric|a numeric value|`value: 5` or `"value": 6.67`
|NumericList|int or string|`value: 5` or `"value": "option name"`
|Period|-|Period is not a settable field. It is calculated according to the settings of the field
|Position|Guid[]|<pre>"value": [<br>{<br>  "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151"</br>}]</pre>
|Risk matrix|-|Risk matrix is not a settable field. It is calculated according to the settings of the field
|Score matrix 3D|-|Score matrix 3D is not a settable field. It is calculated according to the settings of the field
|Text|string|`value: "some text"`
|Time|string in time format (hh:mm)|`"value":"12:31"`
|User|Guid[]|<pre>"value": [<br>{<br>  "EEC6D86E-9CFE-4D50-8FFB-F51F9FA8D151"</br>}]</pre>
|WebPage|string in format `<scheme>://<host>/<path>`|`"value":"https://www.infoland.nl/"`