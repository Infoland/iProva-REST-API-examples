/*
This example shows how to get the notifications of the logged in user.
*/

const _bearerToken = "bearer token"; // See authorization examples how to get a secure token
const _apiBaseUrl = "https://customer.zenya.work/api";
function getNotifications()
{
	$.ajax({
		method: "GET",
		url: `${_apiBaseUrl}/users/me/notifications/`,
		beforeSend: function (request)
		{
			request.setRequestHeader("Authorization", "Bearer " + _bearerToken);
			request.setRequestHeader("Accept", "application/vnd.example.api+json");
			request.setRequestHeader("x-api-version", "5");
		},
		contentType: "application/json",
		success: function (result)
		{
			alert("Number of notifications: " + result.length);
		}
	});
}
