using System.Reflection;
using DoAn.Bussiness.Infrastructure;
using DoAn.Bussiness.Infrastructure.AutoMapper;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace DoAn.Bussiness
{
    public static class SetUp
    {
        public static IServiceCollection AddBussiness(this IServiceCollection services)
        {
            // Add AutoMapper
            services.AddAutoMapper(typeof(AutoMapperProfile));

            // Add MediatR
            services.AddMediatR(typeof(SetUp).GetTypeInfo().Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));
            return services;
        }
    }
}
