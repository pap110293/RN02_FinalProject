using System.Collections.Generic;

namespace DoAn.Domain
{
    public class MenuCategory : EntityBase<int>
    {
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Color { get; set; }
        public string BackgroundColor { get; set; }
        public int TenantId { get; set; }
        public virtual Tenant Tenant { get; set; }
        public int ParentId { get; set; }
        public virtual MenuCategory Parent { get; set; }
        public virtual ICollection<MenuCategory> Children {get;set;} = new List<MenuCategory>();
        public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
    }
}
