using System;
using System.Collections.Generic;
using System.Text;

namespace DoAn.Domain
{
    public class OrderedAddition : EntityBase<long>
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public long OrderDetailId { get; set; }
        public virtual OrderDetail OrderDetail { get; set; }
    }
}
