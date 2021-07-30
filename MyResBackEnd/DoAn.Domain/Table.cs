using System.Collections.Generic;

namespace DoAn.Domain
{
    public class Table : EntityBase<int>
    {
        public string Name { get; set; }
        public int SectionId { get; set; }
        public virtual Section Section { get; set; }
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
