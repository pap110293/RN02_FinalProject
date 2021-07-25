using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DoAn.Domain
{
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
