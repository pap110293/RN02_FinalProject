using System;
using System.Collections.Generic;
using System.Text;

namespace DoAn.Domain
{
    public class OrderedCookingPoint : EntityBase<long>
    {
        public string CookingPointName { get; set; }
        public long OrderDetailId { get; set; }
        public virtual OrderDetail OrderDetail { get; set; }
    }
}
