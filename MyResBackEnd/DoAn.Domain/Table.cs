namespace DoAn.Domain
{
    public class Table : EntityBase<int>
    {
        public string Name { get; set; }
        public int SectionId { get; set; }
        public virtual Section Section { get; set; }
    }
}
