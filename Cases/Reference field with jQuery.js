/*
This example shows how to create a new case with a reference field in it.
References are created separately from a case. You can either:
  - create a draft case
  - create a reference
  - set the reference field to contain the created reference
or
 - create a reference
 - post a new case with the reference field filled with the created reference

For details on the format of an reference field value, see FieldFormats.md

*/

var _credentials = "<credentials>"; // See authorization examples how to generate credentials

function createCase() {

	//TODO: 
	// - call api to create reference
	// - fill correct hyperlink_id in post cases

	// Create case for form with id '195'
	$.ajax({
		method: "POST",
		url: "https://<customer>.zenya.work/api/cases",
		beforeSend: function (request) {
			request.setRequestHeader("Authorization", "Basic " + _credentials);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "3");
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
						"value": <attachment>
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