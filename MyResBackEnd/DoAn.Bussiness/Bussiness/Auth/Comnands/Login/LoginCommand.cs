using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DoAn.Auth.Services;
using DoAn.Bussiness.Bussiness.Auth.Models;
using DoAn.Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace DoAn.Bussiness.Bussiness.Auth.Comnands.Login
{
    public class LoginCommand : IRequest<LoginResultDto>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class Handler : IRequestHandler<LoginCommand, LoginResultDto>
    {
        private readonly IAuthService _authService;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public Handler(IAuthService authService, SignInManager<User> signInManager, UserManager<User> userManager, IMapper mapper)
        {
            _authService = authService;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<LoginResultDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(request.Username);

            if (user != null)
            {
                var signInResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (signInResult.Succeeded)
                {
                    var token = await _authService.CreateJwtToken(user);
                    var userInfoDto = _mapper.Map<UserInfoDto>(user);

                    return new LoginResultDto
                    {
                        Token = token,
                        UserInfo = userInfoDto
                    };
                }
            }

            return null;
        }
    }
}
