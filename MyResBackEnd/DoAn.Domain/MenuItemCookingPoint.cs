using System;
using System.Collections.Generic;
using System.Text;

namespace DoAn.Domain
{
    public class MenuItemCookingPoint
    {
        public int MenuItemId { get; set; }
        public int CookingPointId { get; set; }
        public virtual MenuItem MenuItem {get;set;}
        public virtual CookingPoint CookingPoint { get; set; }
    }
}
