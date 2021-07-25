namespace DoAn.Domain
{
    public interface IEntity
    {
        object Id { get; set; }
    }

    public interface IEntity<Tkey>
    {
        Tkey Id { get; set; }
    }
}
