using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DoAn.Domain
{
    public class User : IdentityUser<int>
    {
        public virtual ICollection<UserRole> UserRole { get; set; } = new List<UserRole>();
        public virtual Tenant Tenant { get; set; }
    }
}
