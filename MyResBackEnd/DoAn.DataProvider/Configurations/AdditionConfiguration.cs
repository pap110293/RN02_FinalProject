using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoAn.DataProvider.Configurations
{
    public class AdditionConfiguration : IEntityTypeConfiguration<Addition>
    {
        public void Configure(EntityTypeBuilder<Addition> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.Id)
                .ValueGeneratedOnAdd();

            builder.Property(i => i.Name).IsRequired();
            builder.Property(i => i.Price).IsRequired();
        }
    }
}
