/*
This example shows how to set the version of the API via a custom header
*/

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});
 
// Create token and call function to get the iProva version
$.ajax({
    method: "POST",
	url: "http://iprova/api/version/api?api-version=1",
    beforeSend: function(request) 
    {
        request.setRequestHeader("Accept","application/vnd.example.api+json");
    },
    contentType: "application/json",
    success: function (result)
    {
		alert(result.version);
    }
});