/*
This example shows how to create a card
*/

const _bearerToken = "bearer token"; // See authorization examples how to get a secure token
const _apiBaseUrl = "https://customer.zenya.work/api";
const _dataTypeId = 1;
const _externalId = "E_1234";
const _fieldId = 10005; // Field ID for the text field
const _fieldValue = "text value"; // Value for the text field

async function createCard() {
	
	try {
		const response = await fetch(`${_apiBaseUrl}/objects`, {
			method: "POST",
			headers: {
				"accept": "application/json",
				"Content-Type": "application/json",
				"x-api-version": "5",
				"Authorization": `Bearer ${_bearerToken}`
			},
			body: JSON.stringify({
				"data_type_id": _dataTypeId,
				"custom_field_values": [
					{
						"field_id": _fieldId,
						"value": _fieldValue
					}
				],
				"external_id": _externalId
			})
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		alert(result.created_identifier); // Assuming the response contains an id field
	} catch (error) {
		console.error("Error creating object:", error);
		alert("Failed to create object: " + error.message);
	}
}
