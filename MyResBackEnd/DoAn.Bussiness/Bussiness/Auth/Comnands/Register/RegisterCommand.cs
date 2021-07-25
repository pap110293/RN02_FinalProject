using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DoAn.Auth.Services;
using DoAn.Bussiness.Interfaces.Mapping;
using DoAn.Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace DoAn.Bussiness.Bussiness.Auth.Comnands.Register
{
    public class RegisterCommand : IRequest<IdentityResult>, IHaveCustomMapping
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsOwner { get; set; } = true;

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<RegisterCommand, User>();
        }
    }

    public class Handler : IRequestHandler<RegisterCommand, IdentityResult>
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IMediator _mediator;

        public Handler(IMapper mapper, IUserService userService, IMediator mediator)
        {
            _mapper = mapper;
            _userService = userService;
            _mediator = mediator;
        }
        public async Task<IdentityResult> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var newUser = _mapper.Map<User>(request);

            var registerResult = await _userService.CreateUserAsync(newUser, request.Password);

            if (registerResult.Succeeded && request.IsOwner)
            {
                await _mediator.Publish(new OwnerCreated { UserId = newUser.Id });
            }

            return registerResult;
        }
    }
}
