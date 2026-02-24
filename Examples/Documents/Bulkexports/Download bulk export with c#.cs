async public Task<BulkExport> GetBulkExportDetailsAsync(string id)
{
    var token = "<bearertoken>";
    Console.WriteLine("reading bulkexport " + id + " from API");
    var client = new HttpClient();
    var message = new HttpRequestMessage()
    {
        RequestUri = new Uri($"http://customer.zenya.work/api/documents/bulk_exports/{id}"),
        Method = HttpMethod.Get
    };
    message.Headers.Add("Authorization", $"Bearer {token}");
    message.Headers.Add("x-api-version", "5");
    var response = await client.SendAsync(message, HttpCompletionOption.ResponseHeadersRead);
    if (response.IsSuccessStatusCode)
    {
        var strData = await response.Content.ReadAsStringAsync();
        return Newtonsoft.Json.JsonConvert.DeserializeObject<BulkExport>(strData);
    }
    else
        return null;
}

async public Task<BulkExport> DownloadBulkExportAsync(string id, string zipPath)
{
    var token = "<bearertoken>";
    Console.WriteLine("reading bulkexport " + id + " from API");
    var client = new HttpClient();
    var message = new HttpRequestMessage()
    {
        RequestUri = new Uri($"http://customer.zenya.work/api/documents/bulk_exports/{id}/download"),
        Method = HttpMethod.Get
    };
    message.Headers.Add("Authorization", $"Bearer {token}");
    message.Headers.Add("x-api-version", "1");
    var response = await client.SendAsync(message, HttpCompletionOption.ResponseHeadersRead);
    if (response.IsSuccessStatusCode)
    {
        using (var fileStream = new FileStream(zipPath, FileMode.Create))
        {
            await response.Content.CopyToAsync(fileStream);
            if (fileStream.Length > 0)
            {
                blnSuccess = true;
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
