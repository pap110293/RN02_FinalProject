using AutoMapper;
using DoAn.Bussiness.Interfaces.Mapping;
using DoAn.DataProvider;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DoAn.Bussiness.Bussiness.Section.Command.CreateSection
{
    public class CreateSectionCommand : IRequest, IHaveCustomMapping
    {
        public string Name { get; set; } = "Section 1";
        public int TenantId { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<CreateSectionCommand, Domain.Section>();
        }
    }

    public class Handler : IRequestHandler<CreateSectionCommand>
    {
        private readonly IMapper _mapper;
        private readonly DataContext _dataContext;

        public Handler(IMapper mapper, DataContext dataContext)
        {
            _mapper = mapper;
            _dataContext = dataContext;
        }
        public async Task<Unit> Handle(CreateSectionCommand request, CancellationToken cancellationToken)
        {
            var newSection = _mapper.Map<Domain.Section>(request);

            await _dataContext.AddAsync(newSection);
            await _dataContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
