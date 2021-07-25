using System;
using DoAn.DataProvider.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace DoAn.DataProvider
{
    public class DoAnDbContextFactory : DesignTimeDbContextFactoryBase<DataContext>
    {
        protected override DataContext CreateNewInstance(DbContextOptions<DataContext> options)
        {
            return new DataContext(options);
        }
    }
}
