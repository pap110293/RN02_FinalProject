using System.Threading.Tasks;
using DoAn.Domain;
using Microsoft.AspNetCore.Identity;

namespace DoAn.Auth.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> AddRoleToUser(User user, params string[] roles)
        {
            return await _userManager.AddToRolesAsync(user, roles);
        }

        public async Task<IdentityResult> CreateUserAsync(User newUser, string password)
        {
            var result = await _userManager.CreateAsync(newUser, password);

            return result;
        }
    }
}
