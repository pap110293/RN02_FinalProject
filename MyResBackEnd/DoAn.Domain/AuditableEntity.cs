using System;
namespace DoAn.Domain
{
    public interface IAuditableEntity
    {
        int CreatedBy { get; set; }

        DateTime CreatedOn { get; set; }

        int LastModifiedBy { get; set; }

        DateTime? LastModified { get; set; }
    }

    public abstract class AuditableEntity<TKey> : EntityBase<TKey>, IAuditableEntity
    {
        public int CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        public int LastModifiedBy { get; set; }

        public DateTime? LastModified { get; set; }
    }
}
