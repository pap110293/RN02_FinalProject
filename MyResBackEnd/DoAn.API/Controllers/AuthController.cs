using System.Threading.Tasks;
using DoAn.Bussiness.Bussiness.Auth.Comnands.Login;
using DoAn.Bussiness.Bussiness.Auth.Comnands.Register;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DoAn.API.Controllers
{
    [Route("api/auth")]
    public class AuthController : DoAnControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand registerCommand)
        {
            var registerResult = await _mediator.Send(registerCommand);

            if (registerResult.Succeeded)
            {
                return NoContent();
            }

            return BadRequest(registerResult.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand loginCommand)
        {
            var loginResult = await _mediator.Send(loginCommand);

            if (loginResult == null)
            {
                return Unauthorized();
            }

            return Ok(loginResult);
        }
    }
}
