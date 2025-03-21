/*
This example shows how to search for content items in a specific portal.
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
		//Get content items using filter
		var contentItems = (await GetContentItems(filterId));
		console.log("Number of content items found: " + contentItems);
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