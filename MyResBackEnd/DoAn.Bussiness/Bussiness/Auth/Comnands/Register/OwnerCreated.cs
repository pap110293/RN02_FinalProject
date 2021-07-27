using DoAn.Bussiness.Bussiness.Tenant.Commands.CreateTenant;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DoAn.Bussiness.Bussiness.Auth.Comnands.Register
{
    public class OwnerCreated : INotification
    {
        public int UserId { get; set; }
    }

    public class OwnerCreatedHandler : INotificationHandler<OwnerCreated>
    {
        private readonly IMediator _mediator;

        public OwnerCreatedHandler(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task Handle(OwnerCreated notification, CancellationToken cancellationToken)
        {
            await _mediator.Send(new CreateTenantCommand { OwnerId = notification.UserId });
        }
    }
}
