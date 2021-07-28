namespace DoAn.Bussiness.Infrastructure.CloudinaryPhoto.Settings
{
    public class CloudinarySettings
    {
        public const string SettingName = "CloudinarySettings";

        public string CloudName { get; private set; }
        public string ApiKey { get; private set; }
        public string ApiSecret { get; private set; }

    }
}
