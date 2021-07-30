using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoAn.DataProvider.Configurations
{
    public class PriceConfiguration : IEntityTypeConfiguration<ItemPrice>
    {
        public void Configure(EntityTypeBuilder<ItemPrice> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.Id)
                .ValueGeneratedOnAdd();
            builder.HasOne(i => i.MenuItem)
                .WithMany(i => i.Prices)
                .HasForeignKey(i => i.MenuItemId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(i => i.Name).IsRequired();
            builder.Property(i => i.MenuItemId).IsRequired();
        }
    }
}
