using DoAn.Bussiness.Infrastructure;
using DoAn.Bussiness.Infrastructure.AutoMapper;
using DoAn.Bussiness.Infrastructure.CloudinaryPhoto;
using DoAn.Bussiness.Infrastructure.CloudinaryPhoto.Settings;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace DoAn.Bussiness
{
    public static class SetUp
    {
        public static IServiceCollection AddBussiness(this IServiceCollection services, IConfiguration configuration)
        {
            // Add AutoMapper
            services.AddAutoMapper(typeof(AutoMapperProfile));

            // Add MediatR
            services.AddMediatR(typeof(SetUp).GetTypeInfo().Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

            var cloudinarySettings = configuration.GetSection(CloudinarySettings.SettingName).Get<CloudinarySettings>();
            services.AddSingleton(cloudinarySettings);

            services.AddScoped<CloudinaryClientFactory>();

            return services;
        }
    }
}
