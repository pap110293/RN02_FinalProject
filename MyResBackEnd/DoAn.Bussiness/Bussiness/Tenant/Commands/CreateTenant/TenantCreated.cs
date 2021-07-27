using DoAn.Bussiness.Bussiness.Section.Command.CreateSection;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DoAn.Bussiness.Bussiness.Tenant.Commands.CreateTenant
{
    public class TenantCreated : INotification
    {
        public int TenantId { get; set; }
    }

    public class TenantCreatedHandler : INotificationHandler<TenantCreated>
    {
        private readonly IMediator _mediator;

        public TenantCreatedHandler(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task Handle(TenantCreated notification, CancellationToken cancellationToken)
        {
            await _mediator.Send(new CreateSectionCommand { TenantId = notification.TenantId });
        }
    }
}
