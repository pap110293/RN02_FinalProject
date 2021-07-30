using System.Collections.Generic;

namespace DoAn.Domain
{
    public class OrderDetail : AuditableEntity<long>, ISoftDelete
    {
        public string MenuItemName { get; set; }
        public string Comment { get; set; }
        public int Quantity { get; set; }
        public string PriceName { get; set; }
        public decimal Price { get; set; }
        public long OrderId { get; set; }
        public virtual Order Order { get; set; }
        public virtual ICollection<OrderedCookingPoint> CookingPoints { get; set; } = new List<OrderedCookingPoint>();
        public virtual ICollection<OrderedAddition> Additions { get; set; } = new List<OrderedAddition>();
        public bool IsDeleted { get; set; }
        public int DeletedBy { get; set; }
    }
}
