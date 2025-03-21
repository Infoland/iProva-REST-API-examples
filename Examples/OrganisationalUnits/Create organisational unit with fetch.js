/*
This example shows how to create a new organisational unit using the fetch API.
*/

const _tokenID = "get token"; // See authorization examples how to get a secure token

async function createOrganisationalUnit() {
    try {
        const response = await fetch("https://end2endvnext.zenya-dev.nl/api/organisational_units", {
            method: "POST",
            headers: {
                "Authorization": `bearer ${_tokenID}`,
                "Accept": "application/vnd.example.api+json",
                "x-api-version": "5",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": "New Department",
                "description": "A new organisational unit",
                "parent_id": null, // Set this to the ID of the parent organisational unit if needed
                "active": true
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Created organisational unit with ID:", result.id);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
} 