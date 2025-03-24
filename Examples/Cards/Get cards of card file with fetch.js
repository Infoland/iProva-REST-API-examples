/*
This example shows how to get cards of a card file.
The amount of items returned is limit to 100.
See pagination examples to learn how to manipulate the results
*/

const _bearerToken = "get token"; // See authorization examples how to get a secure token
const _apiBaseUrl = "https://customer.zenya.work/api";
const _dataTypeId = 1;

async function getCards() {
	// Get objects of data type
	try {
		const response = await fetch(`${_apiBaseUrl}/objects?data_type_ids=${_dataTypeId}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${_bearerToken}`,
				'Accept': 'application/vnd.example.api+json',
				'x-api-version': '5'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		alert("Number of cards: " + result.length);
	} catch (error) {
		console.error('Error fetching cards:', error);
		alert('Error fetching cards: ' + error.message);
	}
}
