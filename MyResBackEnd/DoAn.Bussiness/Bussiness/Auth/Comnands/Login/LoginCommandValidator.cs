using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace DoAn.Bussiness.Bussiness.Auth.Comnands.Login
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(i => i.Username).NotEmpty();
            RuleFor(i => i.Password).NotEmpty();
        }
    }
}
