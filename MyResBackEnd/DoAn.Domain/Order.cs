using System.Collections.Generic;

namespace DoAn.Domain
{
    public class Order : AuditableEntity<long>, ISoftDelete
    {
        public string TableName { get; set; }
        public string SectionName { get; set; }
        public int TableId { get; set; }
        public virtual Table Table { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public bool IsDeleted { get; set; }
        public int DeletedBy { get; set; }
    }
}
