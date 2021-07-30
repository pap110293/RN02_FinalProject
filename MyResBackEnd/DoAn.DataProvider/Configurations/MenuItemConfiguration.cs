using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoAn.DataProvider.Configurations
{
    public class MenuItemConfiguration : IEntityTypeConfiguration<MenuItem>
    {
        public void Configure(EntityTypeBuilder<MenuItem> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.Id)
                .ValueGeneratedOnAdd();
            builder.HasOne(i => i.Category)
                .WithMany(i => i.MenuItems)
                .HasForeignKey(i => i.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(i => i.Photo).WithMany().HasForeignKey(i => i.PhotoId);

            builder.Property(i => i.Name).IsRequired();
            builder.Property(i => i.CategoryId).IsRequired();
        }
    }
}
