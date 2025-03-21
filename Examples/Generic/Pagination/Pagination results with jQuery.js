/*
This example shows how to alter the result of a request returning paginated results with the REST api.
This can be altered with the envelope parameter.
When set to false the pagination information will be returned in the response headers
When set to true the pagination information will be wrapped into an envelope together with the data
By default the envelope is false, but it can be enabled to get the pagination through certain firewall and policy setups
*/

var _tokenID = "get token"; // See authorization examples how to get a secure token

function getCards(envelope)
{
	if (envelope !== true || envelope !== false)
		envelope = false;

	// Get cards of card file with id '1'
	var cardFileID = 1;
	var cardID;
	$.ajax({
		method: "GET",
		url: "http://iprova/api/card_files/" + cardFileID + "/cards?envelope=" + envelope,
		beforeSend: function (request) 
		{
			request.setRequestHeader("Authorization", "token " + _tokenID);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "1");
		},
		contentType: "application/json",
		success: function (result, textStatus, jqXHR)
		{			
			var totalNumber; 
			var returnedNumber;
			if (envelope)
			{
				totalNumber = result.pagination.total;
				returnedNumber = result.pagination.returned;
			}
			else
			{
				totalNumber = jqXHR.getResponseHeader("X-Pagination-Total");
				returnedNumber = result.length ;
			}

			alert("Number of cards: " + returnedNumber + " of " + totalNumber);
		}
	});
}
