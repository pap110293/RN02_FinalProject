using FluentValidation;

namespace DoAn.Bussiness.Bussiness.Auth.Comnands.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(i => i.Email).EmailAddress();
            RuleFor(i => i.Email).NotEmpty();
            RuleFor(i => i.Username).NotEmpty();
            RuleFor(i => i.Password).NotEmpty();
        }
    }
}
