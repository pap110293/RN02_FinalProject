using System.Threading.Tasks;
using DoAn.Domain;

namespace DoAn.Auth.Services
{
    public interface IAuthService
    {
        public Task<string> CreateJwtToken(User user);
    }
}
