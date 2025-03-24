/*
This example shows how to work with pagination in the REST api.
*/

const _bearerToken = "get token"; // See authorization examples how to get a secure token
const _apiBaseUrl = "https://customer.zenya.work/api";
const _dataTypeId = 1;

async function getObjects(limit = 100, offset = 0) {
    try {
        const params = new URLSearchParams({
            data_type_ids: _dataTypeId,
            limit: limit,
            offset: offset,
            include_total_count: true
        });

        const response = await fetch(`${_apiBaseUrl}/objects?${params}`, {
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
        const totalNumber = response.headers.get("X-Pagination-Total");
        alert("Number of objects: " + result.length + " of " + totalNumber);
    } catch (error) {
        console.error('Error fetching objects:', error);
        alert('Error fetching objects: ' + error.message);
    }
}