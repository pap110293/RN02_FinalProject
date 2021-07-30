using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using DoAn.Auth.Services;
using DoAn.Common.Services;
using DoAn.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace DoAn.DataProvider
{
    public class DataContext : IdentityDbContext<User, Role, int,
    IdentityUserClaim<int>,
    UserRole,
    IdentityUserLogin<int>,
    IdentityRoleClaim<int>,
    IdentityUserToken<int>>
    {
        protected private IDbContextTransaction _currentTransaction;
        private readonly ICurrentUserService _currentUserService;
        private readonly IDateTimeService _dateTime;

        public DataContext(DbContextOptions<DataContext> options, ICurrentUserService currentUserService = null, IDateTimeService dateTimeService = null) : base(options)
        {
            _currentUserService = currentUserService;
            _dateTime = dateTimeService;
        }

        public IQueryable<TEntity> Get<TEntity>(bool includeAchive = false) where TEntity : class
        {
            var query = Set<TEntity>().AsQueryable();

            if (!includeAchive && typeof(ISoftDelete).IsAssignableFrom(typeof(TEntity)))
                query = query.Where(i => ((ISoftDelete)i).IsDeleted == includeAchive);

            return query;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(builder);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            if (_currentUserService != null || _dateTime != null)
            {
                UpdateAuditChanges();
                UpdateSoftDeleteChanges();
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateAuditChanges()
        {
            foreach (var entry in ChangeTracker.Entries<IAuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedBy = _currentUserService.UserId;
                        entry.Entity.CreatedOn = _dateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.LastModifiedBy = _currentUserService.UserId;
                        entry.Entity.LastModified = _dateTime.Now;
                        break;
                }
            }
        }

        private void UpdateSoftDeleteChanges()
        {
            foreach (var entry in ChangeTracker.Entries<ISoftDelete>())
            {
                switch (entry.State)
                {
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.Entity.DeletedBy = _currentUserService.UserId;
                        entry.Entity.IsDeleted = true;
                        break;
                }
            }
        }

        public async Task BeginTransactionAsync()
        {
            if (_currentTransaction != null)
            {
                return;
            }

            _currentTransaction = await base.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted).ConfigureAwait(false);
        }

        public async Task CommitTransactionAsync()
        {
            try
            {
                await SaveChangesAsync().ConfigureAwait(false);

                _currentTransaction?.Commit();
            }
            catch
            {
                RollbackTransaction();
                throw;
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        public void RollbackTransaction()
        {
            try
            {
                _currentTransaction?.Rollback();
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }
    }
}
