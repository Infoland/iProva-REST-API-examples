/*
This example shows how to work with pagination in the REST api.
*/

var _tokenID = "get token"; // See authorization examples how to get a secure token

function getCards(limit, offset)
{
	if (!limit)
		limit = 100;
	if (!offset)
		offset = 0;

	// Get cards of card file with id '1'
	var cardFileID = 1;
	var cardID;
	$.ajax({
		method: "GET",
		url: "http://iprova/api/card_files/" + cardFileID + "/cards?limit=" + limit + "&offset=" + offset,
		beforeSend: function (request) 
		{
			request.setRequestHeader("Authorization", "token " + _tokenID);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "1");
		},
		contentType: "application/json",
		success: function (result, textStatus, jqXHR)
		{
			// By default a set of headers is returned which can be queried for information, this can be altered
			var totalNumber = jqXHR.getResponseHeader("X-Pagination-Total");
			alert("Number of cards: " + result.length + " of " + totalNumber);
		}
	});
}
