/*
This example shows how to get the notifications of the logged in user.
*/

var _tokenID = "get token"; // See authorization examples how to get a secure token

function getNotifications()
{
	$.ajax({
		method: "GET",
		url: "http://iprova/api/users/me/notifications/",
		beforeSend: function (request)
		{
			request.setRequestHeader("Authorization", "token " + _tokenID);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "1");
		},
		contentType: "application/json",
		success: function (result)
		{
			alert("Number of notifications: " + result.length);
		}
	});
}
