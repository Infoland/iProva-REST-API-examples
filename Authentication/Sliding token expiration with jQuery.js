/*
This example shows how to implement a sliding token expiration system with jQuery.
Of course you should never expose your apiKey in the front end.
*/

var _apiKey = "set api key";
var _userName = "j.t.kirk";
var _tokenID;

// Call this function multiple times in a time span the token should expire
function getiProvaVersion(callback)
{
	executeAPICall(
		{
			"method":"GET",
			"url":"http://iprova/api/versions/iprova", 
			"callback":callback
		});
}

// Globally handle all ajax errors (ignore token expired)
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) 
{
	if (jqxhr.responseJSON != "token_expired")
	{
		// Any other error then token_expired
		alert(JSON.stringify(jqxhr));
	}
});
 
// Get a token which still works
function ensureToken(forceTokenRefresh, callback)
{
	//Do we have a token?
	if(forceTokenRefresh || !_tokenID)
	{
		// New token
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
				_tokenID = result;
				callback();
			}
		});
	}
	else
	{
		// Already a token
		callback();
	}
}

//executes an API call
function executeAPICall(params)
{
	var url = params["url"];
	var forceTokenRefresh = params["forceTokenRefresh"];
	var callback = params["callback"];
	var method = params["method"];

	//make sure we have a token
	ensureToken(forceTokenRefresh, function()
	{
		//now execute the actual call
		$.ajax({
			method: method,
			beforeSend: function(request) 
			{
				request.setRequestHeader("x-api-version", "1");
				request.setRequestHeader("Authorization", "Token " + _tokenID);
				request.setRequestHeader("Accept","application/vnd.example.api+json");
			},
			url: url,
			contentType: "application/json",
			success: function (result)
			{
				callback(result);
			},
			error: function(jqxhr, textStatus, errorThrown)
			{
				//something went wrong. Is it because the token expired?
				if(jqxhr.responseJSON == "token_expired")
				{
					//then try again with a new token
					params["forceTokenRefresh"] = true;
					executeAPICall(params);
				}
			}
		});

	});
}


