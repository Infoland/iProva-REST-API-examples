/*
This example shows how credential authentication is handled with jQuery.
Of course you should never expose your apiKey in the front end.
Also a token can expire after a while. It is possible to implement a sliding token expiration system. There is a different example for that.
*/

var _apiKey = "set api key";
var _userName = "j.t.kirk";
var _tokenID;

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});
 
// Create token and call function to get the iProva version
$.ajax({
    method: "POST",
	url: "http://iprova/api/tokens",
    beforeSend: function(request) 
    {
        request.setRequestHeader("x-api-version", "1");
        request.setRequestHeader("Accept","application/vnd.example.api+json");
    },
    contentType: "application/json",
    data: JSON.stringify({"api_key":_apiKey,"username":_userName}),
    success: function (result)
    {
        tokenID = result;
        displayIProvaVersion();
    }
});

function displayIProvaVersion()
{
    $.ajax({
        method: "GET",
        url: "http://iprova/api/versions/iprova",
        beforeSend: function (request) 
        {
            request.setRequestHeader("Authorization", "token " + _tokenID);
            request.setRequestHeader("Accept", "application/vnd.example.api+json");
            request.setRequestHeader("x-api-version", "1");
        },
        contentType: "application/json",
        success: function (result)
        {
            alert(result.version);
        }
    });
}
