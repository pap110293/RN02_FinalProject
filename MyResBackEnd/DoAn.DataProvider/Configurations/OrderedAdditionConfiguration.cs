using DoAn.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace DoAn.DataProvider.Configurations
{
    public class OrderedAdditionConfiguration : IEntityTypeConfiguration<OrderedAddition>
    {
        public void Configure(EntityTypeBuilder<OrderedAddition> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.Id)
                .ValueGeneratedOnAdd();

            builder.HasOne(i => i.OrderDetail).WithMany(i => i.Additions).HasForeignKey(i => i.OrderDetailId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
