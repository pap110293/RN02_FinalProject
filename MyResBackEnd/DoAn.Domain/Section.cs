using System.Collections.Generic;

namespace DoAn.Domain
{
    public class Section : EntityBase<int>
    {
        public string Name { get; set; }
        public int TenantId { get; set; }
        public virtual Tenant Tenant { get; set; }
        public virtual ICollection<Table> Tables { get; set; }
    }
}
