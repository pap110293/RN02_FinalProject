using System;
using FluentValidation;

namespace DoAn.Bussiness.Bussiness.Tenant.Commands
{
    public class CreateTenantCommandValidator : AbstractValidator<CreateTenantCommand>
    {
        public CreateTenantCommandValidator()
        {
            RuleFor(x => x.OwnerId).NotEmpty();
        }
    }
}
