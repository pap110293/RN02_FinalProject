using System;
using DoAn.DataProvider;
using DoAn.Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace DoAn.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var service = scope.ServiceProvider;
                try
                {
                    var context = service.GetRequiredService<DataContext>();
                    var userManager = service.GetRequiredService<UserManager<User>>();
                    var roleManager = service.GetRequiredService<RoleManager<Role>>();
                    context.Database.EnsureCreated();
                    context.Database.Migrate();
                    //Seed.SeedUsers(userManager, roleManager);
                }
                catch (Exception ex)
                {
                    var loger = service.GetRequiredService<ILogger<Program>>();
                    loger.LogError(ex, "An erorr occured during migragion");
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
