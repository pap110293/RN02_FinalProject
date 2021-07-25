using System;
using DoAn.Common.Services;
using Microsoft.Extensions.DependencyInjection;

namespace DoAn.Common
{
    public static class SetUp
    {
        public static IServiceCollection AddCommon(this IServiceCollection services)
        {
            services.AddScoped<IDateTimeService, DateTimeService>();
            return services;
        }
    }
}
