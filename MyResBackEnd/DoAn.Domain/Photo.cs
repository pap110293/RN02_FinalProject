using System;
using System.Collections.Generic;
using System.Text;

namespace DoAn.Domain
{
    public class Photo : EntityBase<long>
    {
        public string Url { get; set; }
        public string Discription { get; set; }
        public string PublicId { get; set; }
    }
}
