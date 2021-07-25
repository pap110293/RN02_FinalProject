using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using DoAn.Bussiness.Interfaces.Mapping;
using DoAn.DataProvider;
using MediatR;

namespace DoAn.Bussiness.Bussiness.Tenant.Commands
{
    public class CreateTenantCommand : IRequest, IHaveCustomMapping
    {
        public int OwnerId { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<CreateTenantCommand, Domain.Tenant>();
        }
    }

    public class Handler : IRequestHandler<CreateTenantCommand>
    {
        private readonly IMapper _mapper;
        private readonly DataContext _data;

        public Handler(IMapper mapper, DataContext repository)
        {
            _mapper = mapper;
            _data = repository;
        }

        public async Task<Unit> Handle(CreateTenantCommand request, CancellationToken cancellationToken)
        {
            var newTenant = _mapper.Map<Domain.Tenant>(request);
            await _data.AddAsync(newTenant);

            return Unit.Value;
        }
    }
}
