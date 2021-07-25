using System.Text;
using DoAn.Auth.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace DoAn.Auth
{
    public static class SetUp
    {
        public static IServiceCollection AddAuth(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(option => option.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("Authentication:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                });

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            return services;
        }
    }
}
