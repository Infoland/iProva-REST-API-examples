/*
This example shows how to create a new case.
In this example the following fields are used:
- Field with id 1: subject field
- Field with id 1002: text/e-mail/webpage field
- Field with id 1003: formatted text field
- Field with id 1004: (hierarchical/numeric) list field
- Field with id 1005: date field
- Field with id 1006: user/function field
- Field with id 1007: checkbox field
- Field with id 1008: time field
- Field with id 1009: numeric field
- Field with id 1010: attachment field
- Field with id 1011: framework item field
- Field with id 1012: card file (i+Data) field
*/

var _tokenID = "get token"; // See authorization examples how to get a secure token

function createCase()
{
	// Create case for form with id '123'
	$.ajax({
		method: "POST",
		url: "http://iprova/api/cases",
		beforeSend: function (request) 
		{
			request.setRequestHeader("Authorization", "token " + _tokenID);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "1");
		},
		contentType: "application/json",
		data: JSON.stringify(
			{
				"form_id": 123,
				"fields": [
					{
						"field_id": 1,
						"values": [
							{
								"id": "140"
							}
						]
					},
					{
						"field_id": 1002,
						"values": [
							{
								"value": "This is a test"
							}
						]
					},
					{
						"field_id": 1003,
						"values": [
							{
								"value": "<p>This is a <strong>test</strong><p>"
							}
						]
					},
					{
						"field_id": 1004,
						"values": [
							{
								"id": "750"
							},
							{
								"id": "751"
							},
							{
								"id": "752"
							}
						]
					},
					{
						"field_id": 1005,
						"values": [
							{
								"id": "20180319"
							}
						]
					},
					{
						"field_id": 1006,
						"values": [
							{
								"value": "95ab6190-eafd-4a7c-bf2c-012ab87e6fdf"
							}
						]
					},
					{
						"field_id": 1007,
						"values": [
							{
								"value": "1"
							}
						]
					},
					{
						"field_id": 1008,
						"values": [
							{
								"value": "16:20"
							}
						]
					},
					{
						"field_id": 1009,
						"values": [
							{
								"value": 173
							}
						]
					},
					{
						"field_id": 1010,
						"values": [
							{
								"value": "<base64-string of attachment 1>",
								"file_name" : "Attachment1.txt",
								"description" : "Description of attachment 1"
							},
							{
								"value": "<base64-string of attachment 2>",
								"file_name" : "Attachment2.txt",
								"description" : "Description of attachment 2"
							}
						]
					},
					{
						"field_id": 1011,
						"values": [
							{
								"id": "789",
								"include_sub_items": false
							},
							{
								"id": "1234",
								"include_sub_items": true
							}
						]
					},
					{
						"field_id": 1012,
						"values": [
							{
								"id": "804"
							},
							{
								"id": "805"
							}
						]
					}
				],
				"gps_location": {
					"latitude": 51.40,
					"longitude": 5.41
				}
			}),
		success: function (result)
		{
			alert(result.created_identifier);
		}
	});
}
