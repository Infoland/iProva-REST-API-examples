/*
This example shows how to create a filter, edit the filter by adding a new filter option to it, get content items using this filter.
Check
*/

var _tokenID = "get token"; // See authorization examples how to get a secure token

async function getContentItems()
{
	//Set headers
	$.ajaxSetup({
		headers: {
			"Authorization": "token " + _tokenID,
			"Accept": "application/vnd.example.api+json",
			"x-api-version": "1"
		}
	});

	var portalId = 100;
	var searchText = "example"

	//Create filter (use search text and portal ID)
	var filterId = (await CreateFilter(searchText, portalId)).created_identifier;

	if (filterId) {
		//Get possible filter fields and options
		var filterOptions = await GetFilterOptions(filterId);
		var filterFieldId = filterOptions[0].filter_field_id;
		var filterFieldOptionId = filterOptions[0].filter_field_options[0].filter_field_option_id;

		if (filterFieldId && filterFieldOptionId) {
			//Add filter options to filter
			filterId = (await AddFilterOptionToFilter(filterId, filterFieldId, filterFieldOptionId)).created_identifier;

			//Get content items using filter
			var contentItems = (await GetContentItems(filterId));
			console.log("Number of content items found: " + contentItems);
		}
	}
}

async function CreateFilter(searchText, portalId) {
    let result;

    try {
        result = await $.ajax({
			method: "POST",
			url: "http://iprova/api/portals/content_items/filter",
			contentType: "application/json",
			data: JSON.stringify({
				"text_contains": searchText,
				"portal_id": portalId
			  })
		});

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function GetFilterOptions(filterId) {
    let result;

    try {
        result = await $.ajax({
			method: "GET",
			url: "http://iprova/api/portals/content_items/filter/" + filterId + "/filter_fields",
			contentType: "application/json"
		});

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function AddFilterOptionToFilter(filterId, filterFieldId, filterFieldOptionId) {
    let result;

    try {
        result = await $.ajax({
			method: "POST",
			url: "http://iprova/api/portals/content_items/filter/" + filterId + "/filter_fields/" + filterFieldId,
			contentType: "application/json",
			data: JSON.stringify({
				"filter_option_id": filterFieldOptionId
			})
		});

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function GetContentItems(filterId) {
    let result;

    try {
        result = await $.ajax({
			method: "GET",
			url: "http://iprova/api/portals/content_items/filter/" + filterId,
			contentType: "application/json",
		});

        return result;
    } catch (error) {
        console.error(error);
    }
}