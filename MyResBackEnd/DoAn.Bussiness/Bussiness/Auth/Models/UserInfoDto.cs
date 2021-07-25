using DoAn.Bussiness.Interfaces.Mapping;
using DoAn.Domain;

namespace DoAn.Bussiness.Bussiness.Auth.Models
{
    public class UserInfoDto : IMapFrom<User>
    {
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
