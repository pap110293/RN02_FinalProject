using System;
namespace DoAn.Domain
{
    public abstract class AuditableEntity
    {
        public int CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public int LastModifiedBy { get; set; }

        public DateTime? LastModified { get; set; }
    }
}
