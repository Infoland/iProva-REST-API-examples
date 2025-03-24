/*
This example shows how to create a new case.
In this example the following fields are used:
- Field with id 1: subject field
- Field with id 1002: a list field

- the form_id parameter is the id of the reporter form to fill out. It can be found to navigate to the details of the form and hovering of a language version of a form

- the id of a field can be found by navigating to the field details in application management. The field is in in the url of the field. For instance:
	https://<customer>.zenya.work/iTask/Admin/GlobalFields/GlobalField_Details.aspx?GlobalFieldID=4552

	the field_id is the value of the "GlobalFieldID" querystring parameter. In this case: 4552
	It is also possible to set fields based on the field name by passing the "field_name" instead of the "field_id"

For details on the format of the value of all field types, see README.md
*/

const _bearerToken = "<bearer token>"; // See authorization examples how to get a secure token

function createCase() {
	// Create case for form with id '195'
	$.ajax({
		method: "POST",
		url: "https://<customer>.zenya.work/api/cases",
		beforeSend: function (request) {
			request.setRequestHeader("Authorization", "Bearer " + _bearerToken);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "5");
		},
		contentType: "application/json",
		data: JSON.stringify(
			{
				"form_id": 195,
				"fields": [
					{
						"field_id": 1,
						"value": 9
					},
					{
						"field_id": 4066,
						"value": [4934, 4935]
					}
				],
				"gps_location": {
					"latitude": 51.40,
					"longitude": 5.41
				}
			}),
		success: function (result) {
			alert(result.created_identifier);
		}
	});
}