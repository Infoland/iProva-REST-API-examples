/*
This example shows how to create a new organisational unit using the fetch API.
*/

const _bearerToken = "bearer token"; // See authorization examples how to get a secure token
const _apiBaseUrl = "https://customer.zenya.work/api";
const _parentId = 12012; // Set this to the ID of the parent organisational unit if needed


async function createOrganisationalUnit() {
    try {
        const response = await fetch(`${_apiBaseUrl}/organisational_units`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${_bearerToken}`,
                "Accept": "application/vnd.example.api+json",
                "x-api-version": "5",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": "New Department",
                "parent_id": _parentId, // Set this to the ID of the parent organisational unit if needed
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Created organisational unit with ID:", result.created_identifier);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
} 