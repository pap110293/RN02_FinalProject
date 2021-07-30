using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoAn.DataProvider.Configurations
{
    public class MenuItemCookingPointConfiguration : IEntityTypeConfiguration<MenuItemCookingPoint>
    {
        public void Configure(EntityTypeBuilder<MenuItemCookingPoint> builder)
        {
            builder.HasKey(i => new { i.CookingPointId,i.MenuItemId});
            builder.HasOne(i => i.MenuItem).WithMany(i => i.MenuItemCookingPoints).HasForeignKey(i => i.MenuItemId);
            builder.HasOne(i => i.CookingPoint).WithMany(i => i.MenuItemCookingPoints).HasForeignKey(i => i.CookingPointId);
        }
    }
}
