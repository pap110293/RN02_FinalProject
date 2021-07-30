using System.Collections.Generic;

namespace DoAn.Domain
{
    public class CookingPoint : EntityBase<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<MenuItemCookingPoint> MenuItemCookingPoints { get; set; } = new List<MenuItemCookingPoint>();
    }
}
