/*
This example shows how to create a filter, edit the filter by adding a new filter option to it, get content items using this filter.
Check
*/

var _tokenID = "get token"; // See authorization examples how to get a secure token

function getContentItems(portalId, searchText)
{
	var filterId;
	//Create filter (use search text and portal ID)
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
		//Get possible filter fields and options
		var filterFieldId;
		var filterFieldOptionId;
		$.ajax({
			method: "GET",
			url: "http://iprova/api/portals/content_items/filter/" + filterId + "/filter_fields",
			beforeSend: function (request)
			{
				request.setRequestHeader("Authorization", "token " + _tokenID);
				request.setRequestHeader("Accept", "application/vnd.example.api+json");
				request.setRequestHeader("x-api-version", "1");
			},
			contentType: "application/json",
			success: function (result)
			{
				//Get the filter field id, and filter field option id
				filterFieldId = result[0].filter_field_id;
				filterFieldOptionId = result[0].filter_field_options[0].filter_field_option_id;
			}
		});

		if (filterFieldId && filterFieldOptionId) {
			//Add filter options to filter
			$.ajax({
				method: "POST",
				url: "http://iprova/api/portals/content_items/filter/" + filterId + "/filter_fields/" + filterFieldId,
				beforeSend: function (request)
				{
					request.setRequestHeader("Authorization", "token " + _tokenID);
					request.setRequestHeader("Accept", "application/vnd.example.api+json");
					request.setRequestHeader("x-api-version", "1");
				},
				contentType: "application/json",
				data: JSON.stringify({
					"filter_option_id": filterFieldOptionId
				}),
				success: function (result)
				{
					filterId = result.created_identifier;
				}
			});

			//Get content items using filter
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
}
