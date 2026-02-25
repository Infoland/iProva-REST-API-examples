public class ZenyaApiClient
{
    private readonly HttpClient _client;

    public ZenyaApiClient(string baseUrl, string token, string apiVersion)
    {
        _client = new HttpClient
        {
            BaseAddress = new Uri(baseUrl)
        };
        _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
        _client.DefaultRequestHeaders.Add("x-api-version", apiVersion);
    }

    public async Task<BulkExport> GetBulkExportDetailsAsync(string id)
    {
        Console.WriteLine("reading bulkexport " + id + " from API");
        var response = await _client.GetAsync($"/api/documents/bulk_exports/{id}", HttpCompletionOption.ResponseHeadersRead);
        if (!response.IsSuccessStatusCode)
            throw new Exception($"Failed to get bulk export details for id {id}. Status code: {response.StatusCode}");

        var strData = await response.Content.ReadAsStringAsync();
        return Newtonsoft.Json.JsonConvert.DeserializeObject<BulkExport>(strData);
    }

    public async Task DownloadBulkExportAsync(string id, string zipPath)
    {
        Console.WriteLine("downloading bulkexport " + id + " from API");
        var response = await _client.GetAsync($"/api/documents/bulk_exports/{id}/download", HttpCompletionOption.ResponseHeadersRead);
        if (!response.IsSuccessStatusCode)
            throw new Exception($"Failed to download bulk export for id {id}. Status code: {response.StatusCode}");

        using (var fileStream = new FileStream(zipPath, FileMode.Create))
        {
            await response.Content.CopyToAsync(fileStream);
            if (fileStream.Length == 0)
                throw new Exception($"Downloaded bulk export zip for id {id} is empty.");

            // success
        }
    }
}

public class BulkExport
{
    public Int32 id { get; set; }
    public string name { get; set; }
    public string state { get; set; }
    public string last_export_datetime { get; set; }
    public bool can_download { get; set; }
}
