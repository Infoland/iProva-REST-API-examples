/*
This example shows how to alter the result of a request returning paginated results with the REST api.
This can be altered with the envelope parameter.
When set to false the pagination information will be returned in the response headers
When set to true the pagination information will be wrapped into an envelope together with the data
By default the envelope is false, but it can be enabled to get the pagination through certain firewall and policy setups
*/

const _bearerToken = "get token"; // See authorization examples how to get a secure token
const _apiBaseUrl = "https://customer.zenya.work/api";
const _dataTypeId = 1;

async function getObjects(envelope = false) {
    try {
        const params = new URLSearchParams({
            data_type_ids: _dataTypeId,
            limit: 10,
            offset: 0,
            include_total_count: true,
			envelope: envelope
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
		var totalNumber; 
		var returnedNumber;
		if (envelope)
		{
			totalNumber = result.pagination.total;
			returnedNumber = result.pagination.returned;
		}
		else
		{
			totalNumber = jqXHR.getResponseHeader("X-Pagination-Total");
			returnedNumber = result.length ;
		}

		alert("Number of cards: " + returnedNumber + " of " + totalNumber);
    } catch (error) {
        console.error('Error fetching objects:', error);
        alert('Error fetching objects: ' + error.message);
    }
}

