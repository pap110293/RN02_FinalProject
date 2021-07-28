using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoAn.DataProvider.Configurations
{
    public class MenuCategoryConfiguration : IEntityTypeConfiguration<MenuCategory>
    {
        public void Configure(EntityTypeBuilder<MenuCategory> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.Id)
                .ValueGeneratedOnAdd();
            builder.HasOne(i => i.Tenant)
                .WithMany(i => i.MenuCategories)
                .HasForeignKey(i => i.TenantId);
            builder.HasOne(i => i.Parent)
                .WithMany(i => i.Children)
                .HasForeignKey(i => i.ParentId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
