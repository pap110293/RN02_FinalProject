using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DoAn.DataProvider.Configurations
{
    public class TenantConfiguration : IEntityTypeConfiguration<Tenant>
    {
        public void Configure(EntityTypeBuilder<Tenant> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Id).ValueGeneratedOnAdd();
            builder.HasOne(t => t.Owner)
                .WithOne(u => u.Tenant)
                .HasForeignKey<Tenant>(t => t.OwnerId);
        }
    }
}
