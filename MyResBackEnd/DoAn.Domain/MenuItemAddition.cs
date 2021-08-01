namespace DoAn.Domain
{
    public class MenuItemAddition
    {
        public int MenuItemId { get; set; }
        public int AdditionId { get; set; }
        public virtual MenuItem MenuItem { get; set; }
        public virtual Addition Addition { get; set; }
    }
}
