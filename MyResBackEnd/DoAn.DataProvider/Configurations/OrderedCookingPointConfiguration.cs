using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoAn.DataProvider.Configurations
{
    public class OrderedCookingPointConfiguration : IEntityTypeConfiguration<OrderedCookingPoint>
    {
        public void Configure(EntityTypeBuilder<OrderedCookingPoint> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.Id)
                .ValueGeneratedOnAdd();

            builder.Property(i => i.OrderDetailId).IsRequired();

            builder.HasOne(i => i.OrderDetail)
                .WithMany(i => i.CookingPoints)
                .HasForeignKey(i => i.OrderDetailId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
