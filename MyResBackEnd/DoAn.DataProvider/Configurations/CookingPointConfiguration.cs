using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoAn.DataProvider.Configurations
{
    class CookingPointConfiguration : IEntityTypeConfiguration<CookingPoint>
    {
        public void Configure(EntityTypeBuilder<CookingPoint> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.Id)
                .ValueGeneratedOnAdd();

            builder.Property(i => i.Name).IsRequired();
        }
    }
}
