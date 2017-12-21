/*
This example shows how credential authentication is handled with jQuery.
Of course you should never expose your apiKey in the front end.
Also a token can expire after a while. It is possible to implement a sliding token expiration system. There is a different example for that.
*/

var _apiKey = "set api key";
var _userName = "j.t.kirk";
var _password = "set password";
var _bearerTokenID;

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});
 
// Create token and call function to get the iProva version
$.ajax({
    method: "POST",
	url: "http://iprova/api/bearer_tokens",
    beforeSend: function(request) 
    {
        request.setRequestHeader("x-api-version", "1");
        request.setRequestHeader("x-api_key", _apiKey);
        request.setRequestHeader("Accept", "application/vnd.example.api+json");
        request.setRequestHeader("Authorization", "credentials u:" + _userName + " pwd:" + _password);
    },
    contentType: "application/json",
    success: function (result)
    {
        _bearerTokenID = result;
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
            request.setRequestHeader("Authorization", "bearer " + _bearerTokenID);
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
