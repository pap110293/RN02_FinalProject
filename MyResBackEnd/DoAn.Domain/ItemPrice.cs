using System;
using System.Collections.Generic;
using System.Text;

namespace DoAn.Domain
{
    public class ItemPrice : EntityBase<int>
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int MenuItemId { get; set; }
        public virtual MenuItem MenuItem { get; set; }
    }
}
