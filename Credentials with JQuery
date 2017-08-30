var apiKey = "set api key";
var userName = "j.t.kirk";
var password = "set password";

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});

// Get the iProva version
$.ajax({
    method: "POST",
    beforeSend: function(request) 
    {
        request.setRequestHeader("Authorization", "credentials u:" + userName + " pwd:" + password);
        request.setRequestHeader("x-api_key", apiKey);
        request.setRequestHeader("x-api-version", "1");
        request.setRequestHeader("Accept","application/vnd.example.api+json");
    },
    url: "http://iprova/api/versions/iprova",
    contentType: "application/json"
    success: function (result)
    {
        alert(result.version);
    }
});
