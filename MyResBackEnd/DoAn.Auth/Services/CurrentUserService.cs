using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace DoAn.Auth.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            if (int.TryParse(httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier), out var userId))
            {
                UserId = userId;
            }
        }

        public int UserId { get; }
    }
}
