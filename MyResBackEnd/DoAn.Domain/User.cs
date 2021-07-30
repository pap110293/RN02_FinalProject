using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DoAn.Domain
{
    public class User : IdentityUser<int>
    {
        public int TenantId { get; set; }
        public virtual ICollection<UserRole> UserRole { get; set; } = new List<UserRole>();
        public virtual Tenant OwnTenant { get; set; }
        public virtual Tenant StaffTenant { get; set; }
    }
}
