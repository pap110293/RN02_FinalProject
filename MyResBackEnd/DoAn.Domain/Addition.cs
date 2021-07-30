using System;
using System.Collections.Generic;
using System.Text;

namespace DoAn.Domain
{
    public class Addition : EntityBase<int>
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public ICollection<MenuItemAddition> MenuItemAdditions { get; set; } = new List<MenuItemAddition>();
    }
}
