/*
This example shows how to search for contentitems in a specific portal.
*/

var _tokenID = "get token"; // See authorization examples how to get a secure token

function getContentItems(portalId, searchText)
{
	var filterId;
	$.ajax({
		method: "POST",
		url: "http://iprova/api/portals/content_items/filter",
		beforeSend: function (request)
		{
			request.setRequestHeader("Authorization", "token " + _tokenID);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "1");
		},
		contentType: "application/json",
		data: JSON.stringify({
			"text_contains": searchText,
			"portal_id": portalId
		  }),
		success: function (result)
		{
			filterId = result.created_identifier;
		}
	});

	if (filterId) {
		$.ajax({
			method: "GET",
			url: "http://iprova/api/portals/content_items/filter/" + filterId,
			beforeSend: function (request)
			{
				request.setRequestHeader("Authorization", "token " + _tokenID);
				request.setRequestHeader("Accept", "application/vnd.example.api+json");
				request.setRequestHeader("x-api-version", "1");
			},
			contentType: "application/json",
			success: function (result)
			{
				alert("Number of content items: " + result.length);
			}
		});
	}
}
