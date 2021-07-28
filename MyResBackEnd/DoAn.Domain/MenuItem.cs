using System.Collections.Generic;

namespace DoAn.Domain
{
    public class MenuItem : EntityBase<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int CookingTimeLimit { get; set; }
        public int CategoryId { get; set; }
        public virtual MenuCategory Category { get; set; }
        public long? PhotoId { get; set; }
        public virtual Photo Photo {get;set;}
        public virtual ICollection<Price> Prices { get; set; } = new List<Price>(); 

    }
}
