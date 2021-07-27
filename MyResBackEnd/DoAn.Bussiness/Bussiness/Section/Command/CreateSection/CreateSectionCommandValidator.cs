using DoAn.DataProvider;
using FluentValidation;
using System.Linq;

namespace DoAn.Bussiness.Bussiness.Section.Command.CreateSection
{
    public class CreateSectionCommandValidator : AbstractValidator<CreateSectionCommand>
    {
        public CreateSectionCommandValidator(DataContext dataContext)
        {
            RuleFor(i => i.Name).NotEmpty();
            RuleFor(i => i.TenantId).NotEqual(0);
            RuleFor(i => i.TenantId).Custom((tenantId, context) =>
            {
                var tenant = dataContext.Get<Domain.Tenant>().FirstOrDefault(i => i.Id == tenantId);

                if (tenant == null)
                {
                    context.AddFailure($"Tenant id {tenantId} not found");
                }
            });
        }
    }
}
