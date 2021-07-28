using CloudinaryDotNet;
using DoAn.Bussiness.Infrastructure.CloudinaryPhoto.Settings;

namespace DoAn.Bussiness.Infrastructure.CloudinaryPhoto
{
    public class CloudinaryClientFactory
    {
        private readonly CloudinarySettings _setting;

        public CloudinaryClientFactory(CloudinarySettings cloudinarySettings)
        {
            _setting = cloudinarySettings;
        }

        public Cloudinary Create()
        {
            var account = new Account(_setting.CloudName, _setting.ApiKey, _setting.ApiSecret);
            return new Cloudinary(account);
        }
    }
}
