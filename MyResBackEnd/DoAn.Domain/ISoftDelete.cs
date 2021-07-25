namespace DoAn.Domain
{
    public interface ISoftDelete
    {
        bool IsDeleted { get; set; }
        int DeletedBy { get; set; }
    }
}
