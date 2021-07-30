using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoAn.DataProvider.Configurations
{
    public class MenuItemAdditionConfiguration : IEntityTypeConfiguration<MenuItemAddition>
    {
        public void Configure(EntityTypeBuilder<MenuItemAddition> builder)
        {
            builder.HasKey(i => new { i.AdditionId, i.MenuItemId });
            builder.HasOne(i => i.Addition).WithMany(i => i.MenuItemAdditions).HasForeignKey(i => i.AdditionId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(i => i.MenuItem).WithMany(i => i.MenuItemAdditions).HasForeignKey(i => i.MenuItemId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
