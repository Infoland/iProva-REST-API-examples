/*
This example shows how to create a new case with a hyperlink field in it.
Hyperlinks are created separately from a case. You can either:
  - create a draft case
  - create a temporary hyperlink
  - set the hyperlink field to contain the temporary hyperlink
or
 - create a temporary hyperlink
 - post a new case with the hyperlink field filled with the temporary hyperlink id
For details on the format of a hyperlink field value, see README.md
*/

const _bearerToken = "<bearer token>"; // See authorization examples how to get a secure token

function createTemporaryHyperlink() {
	// Create temporary hyperlink
	$.ajax({
		method: "POST",
		url: "https://<customer>.zenya.work/api/hyperlinks",
		beforeSend: function (request) {
			request.setRequestHeader("Authorization", "Bearer " + _bearerToken);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "5");
		},
		contentType: "application/json",
		data: JSON.stringify(
			{
			  "target": {
			    "web_page_url": "https://www.infoland.nl/",
			    "type": "webpage"
			  },
			  "source": {
			    "type": "to_do"
			  }
			}),
		success: function (result) {
			createCaseWithHyperlink(result.created_identifier); //Should return a Guid
		}
	});
}

function createCaseWithHyperlink(temporaryHyperlinkId) {
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
						"field_id": 4066,
						"value": [
							{
							  "id": temporaryHyperlinkId,
							  "description":"Link to Infoland website"
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
