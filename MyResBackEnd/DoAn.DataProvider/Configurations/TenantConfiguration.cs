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
                .WithOne(u => u.OwnTenant)
                .HasForeignKey<Tenant>(t => t.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(i => i.Staffs)
                .WithOne(i => i.StaffTenant)
                .HasForeignKey(i => i.TenantId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(i => i.OwnerId).IsRequired();
        }
    }
}
