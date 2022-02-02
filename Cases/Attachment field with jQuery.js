/*
This example shows how to create a new case with an attachment field in it.
Attachments are uploaded separately from a case. You can either:
  - create a draft case
  - upload an attachment
  - set the attachment field to contain the uploaded attachment
or
 - upload an attachment
 - post a new case with the attachment field filled with the uploaded attachment

For details on the format of an attachment field value, see FieldFormats.md

*/

var _credentials = "<credentials>"; // See authorization examples how to generate credentials

function createCase() {

	//TODO: 
	// - call api to upload attachment
	// - fill correct attachment_id in post cases

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