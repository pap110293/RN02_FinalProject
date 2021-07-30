using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoAn.DataProvider.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.Id)
                .ValueGeneratedOnAdd();

            builder.Property(i => i.TableId).IsRequired();
            builder.HasOne(i => i.Table)
                .WithMany(i => i.Orders)
                .HasForeignKey(i => i.TableId)
                .OnDelete(DeleteBehavior.ClientSetNull);

        }
    }
}
