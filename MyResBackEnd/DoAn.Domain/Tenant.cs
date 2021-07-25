namespace DoAn.Domain
{
    public class Tenant : EntityBase<int>
    {
        public int OwnerId { get; set; }
        public virtual User Owner { get; set; }
    }
}
