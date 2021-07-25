namespace DoAn.Domain
{
    public class EntityBase : IEntity
    {
        public object Id { get; set; }
    }

    public abstract class EntityBase<TKey> : IEntity<TKey>
    {
        public TKey Id { get; set; }
    }
}
