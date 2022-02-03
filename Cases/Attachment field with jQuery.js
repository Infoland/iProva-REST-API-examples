/*
This example shows how to create a new case with an attachment field in it.
Attachments are uploaded separately from a case. You can either:
  - create a draft case
  - upload an attachment
  - set the attachment field to contain the uploaded attachment
or
 - upload an attachment
 - post a new case with the attachment field filled with the uploaded attachment

For details on the format of an attachment field value, see README.md

*/

var _credentials = "<credentials>"; // See authorization examples how to generate credentials

function createTemporaryAttachment() {
	// Create temporary attachment
	$.ajax({
		method: "POST",
		url: "https://<customer>.zenya.work/api/cases/atachments",
		beforeSend: function (request) {
			request.setRequestHeader("Authorization", "Basic " + _credentials);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "3");
		},
		contentType: "application/json",
		data: JSON.stringify(
			{
				"file_name": "Attachment 1.txt",
				"base_64_file": "YXR0YWNobWVudCBleGFtcGxl"
			}),
		success: function (result) {
			createCaseWithAttachment(result.created_identifier); //Should return a Guid
		}
	});
}

function createCaseWithAttachment(temporaryAttachmentId) {
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
						"field_id": 4066,
						"value": [
							{
							  "id": temporaryAttachmentId,
							  "file_name":"Attachment 1.txt"
							}
						]
					}
				]
			}),
		success: function (result) {
			alert(result.created_identifier);
		}
	});
}
