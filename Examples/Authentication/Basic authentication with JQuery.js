/*
This example shows how credential authentication is handled with jQuery.
Of course you should never expose your apiKey or password in the front end.
*/
var _userName = "j.t.kirk";
var _password = "set password";

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});

function base64EncodeUnicode(input) {
    return btoa(
	encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
	    return String.fromCharCode(parseInt("0x" + p1));
	})
    );
}

// Get the iProva version
$.ajax({
    method: "GET",
	url: "http://iprova/api/versions/iprova",
    beforeSend: function(request) 
    {
        request.setRequestHeader("Authorization", "Basic " + base64EncodeUnicode(credentials.username + ":" + credentials.password));
        request.setRequestHeader("x-api-version", "1");
        request.setRequestHeader("Accept","application/vnd.example.api+json");
    },
    contentType: "application/json"
    success: function (result)
    {
        alert(result.version);
    }
});
