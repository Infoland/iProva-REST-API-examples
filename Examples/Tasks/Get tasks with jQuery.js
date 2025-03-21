/*
This example shows how to get the tasks of the logged in user.
*/

const _tokenID = "get token"; // See authorization examples how to get a secure token

async function getTasks() {
	try {
		const response = await fetch("http://iprova/api/users/me/tasks", {
			method: "GET",
			headers: {
				"Authorization": `bearer ${_tokenID}`,
				"Accept": "application/vnd.example.api+json",
				"x-api-version": "1",
				"Content-Type": "application/json"
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		alert("Number of tasks: " + result.length);
	} catch (error) {
		console.error('Error:', error);
		alert(error);
	}
}
