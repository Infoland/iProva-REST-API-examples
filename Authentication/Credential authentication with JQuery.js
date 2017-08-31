/*
This example shows how credential authentication is handled with jQuery.
Of course you should never expose your apiKey or password in the front end.
*/
var _apiKey = "set api key";
var _userName = "j.t.kirk";
var _password = "set password";

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});

// Get the iProva version
$.ajax({
    method: "GET",
	url: "http://iprova/api/versions/iprova",
    beforeSend: function(request) 
    {
        request.setRequestHeader("Authorization", "credentials u:" + _userName + " pwd:" + _password);
        request.setRequestHeader("x-api_key", _apiKey);
        request.setRequestHeader("x-api-version", "1");
        request.setRequestHeader("Accept","application/vnd.example.api+json");
    },
    contentType: "application/json"
    success: function (result)
    {
        alert(result.version);
    }
});
