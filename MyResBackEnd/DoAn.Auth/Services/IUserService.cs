using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using DoAn.Domain;

namespace DoAn.Auth.Services
{
    public interface IUserService
    {
        public Task<IdentityResult> CreateUserAsync(User user, string password);
        public Task<IdentityResult> AddRoleToUser(User user, params string[] roles);
    }
}
