using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DoAn.DataProvider
{
    public static class SetUp
    {
        public static IServiceCollection AddDataContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(x =>
            {
                x.UseLazyLoadingProxies();
                x.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("DoAn.API"));
            });

            return services;
        }
    }
}
