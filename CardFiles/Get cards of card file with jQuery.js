/*
This example shows how to get cards of a card file.
The amount of items returned is limit to 100.
See pagination examples to learn how to manipulate the results
*/

var _tokenID = "get token"; // See authorization examples how to get a secure token

function getCards()
{
	// Get cards of card file with id '1'
	var cardFileID = 1;
	var cardID;
	$.ajax({
		method: "GET",
		url: "http://iprova/api/card_files/" + cardFileID + "/cards",
		beforeSend: function (request) 
		{
			request.setRequestHeader("Authorization", "token " + _tokenID);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "1");
		},
		contentType: "application/json",
		success: function (result)
		{
			alert("Number of cards: " + result.length);
		}
	});
}
