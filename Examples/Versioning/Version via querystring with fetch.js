/*
This example shows how to set the version of the API via a custom header
*/
fetch(`${_apiBaseUrl}/versions/api?api-version=5`, {
  method: 'GET',
  headers: {
      'Accept': 'application/vnd.example.api+json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_bearerToken}`
  }
})
.then(response => {
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(result => {
  alert(result.version);
})
.catch(error => {
  alert(error);
});