using cdstoolbox.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace cdstoolbox.Controllers
{
    [ApiController]
    [Route("api/ClientOptions")]
    public class ClientOptionsController : Controller
    {
        public ClientOptionsController(IOptions<ClientOptions> options)
        {
            this.options = options;
        }

        private IOptions<ClientOptions> options;

        [HttpGet()]
        public ClientOptions Get()
        {
            return options.Value;
        }
    }
}