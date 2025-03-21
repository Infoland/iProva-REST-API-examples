async public Task<BulkExport> GetBulkExportDetailsAsync(string id)
{
    var token = "<bearertoken>";
    var apiKey = "<api key>";

    Console.WriteLine("reading bulkexport " + id + " from API");
    var client = new HttpClient();
    var message = new HttpRequestMessage()
    {
        RequestUri = new Uri($"http://iprova/api/documents/bulk_exports/{id}"),
        Method = HttpMethod.Get
    };

    // easily add HTTP Headers
    message.Headers.Add("Authorization", $"bearer {token}");
    message.Headers.Add("x-api-version", "1");
    message.Headers.Add("x-api_key", apiKey);

    var response = await client.SendAsync(message, HttpCompletionOption.ResponseHeadersRead);

    if (response.IsSuccessStatusCode)
    {
	//read the response JSON
        var strData = await response.Content.ReadAsStringAsync();
        return Newtonsoft.Json.JsonConvert.DeserializeObject<BulkExport>(strData);
    }
    else
        return null;
}

async public Task<BulkExport> DownloadBulkExportAsync(string id, string zipPath)
{
    var token = "<bearertoken>";
    var apiKey = "<api key>";

    Console.WriteLine("reading bulkexport " + id + " from API");
    var client = new HttpClient();
    var message = new HttpRequestMessage()
    {
        RequestUri = new Uri($"http://iprova/api/documents/bulk_exports/{id}/download"),
        Method = HttpMethod.Get
    };

    // easily add HTTP Headers
    message.Headers.Add("Authorization", $"bearer {token}");
    message.Headers.Add("x-api-version", "1");
    message.Headers.Add("x-api_key", apiKey);

    var response = await client.SendAsync(message, HttpCompletionOption.ResponseHeadersRead);

    if (response.IsSuccessStatusCode)
    {
        using (var fileStream = new FileStream(zipPath, FileMode.Create))
        {
            // download bulk export zip file
            await response.Content.CopyToAsync(fileStream);

            if (fileStream.Length > 0)
            {
                blnSuccess = true; //success
            }
            else
            {
                blnSuccess = false;
            }
        }
    }
    else
        return null;
}

public class BulkExport
{
    public Int32 id { get; set; }

    public string name { get; set; }

    public string state { get; set; }

    public string last_export_datetime { get; set; }

    public bool can_download { get; set; }
}
