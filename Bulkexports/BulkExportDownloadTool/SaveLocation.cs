using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulkExportDownload
{
    class SaveLocation
    {
        public string id { get; set; }
        public string location { get; set; }

        public SaveLocation(string id, string location)
        {
            this.id = id;
            this.location = location;
        }
    }
}
