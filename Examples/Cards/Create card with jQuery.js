/*
This example shows how to create a card
*/

var _tokenID = "get token"; // See authorization examples how to get a secure token

function createCard()
{
	// Create card for card file with id '1'
	var cardFileID = 1;
	var cardID;
	$.ajax({
		method: "POST",
		url: "http://iprova/api/card_files/" + cardFileID + "/cards",
		beforeSend: function (request) 
		{
			request.setRequestHeader("Authorization", "token " + _tokenID);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "1");
		},
		contentType: "application/json",
		data: JSON.stringify(
			{
				"fields":
				[
					{
						"id": 10004,
						"values": [
							{
								"id": null,
								"value": "Mr Spock",
								"description": null
							}
						]
					},
					{
						"id": 10005,
						"values": [
							{
								"id": null,
								"value": "Vulcan",
								"description": null
							}
						]
					}
				],
				"has_image": false
			}),
		success: function (result)
		{
			alert(result.cardID);
		}
	});
}
