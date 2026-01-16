
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using P1WebMVC.Interfaces;

namespace P1WebMVC.Services;

public class CloudinaryService : ICloudinaryService
{

    private readonly string cloudinaryUrl;
    private readonly Cloudinary cloudinary;

    public CloudinaryService(IConfiguration configuration)
    {
        cloudinaryUrl = configuration["CloudinaryURL"] ?? throw new ArgumentNullException(cloudinaryUrl);


        this.cloudinary = new Cloudinary(cloudinaryUrl);
        cloudinary.Api.Secure = true;
    }

    public string UploadImage(IFormFile image)
    {
        try
        {
            if (image == null || image.Length == 0)
            {
                throw new ArgumentException("Image is missing.");
            }

            using var stream = image.OpenReadStream();

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(image.FileName, stream),
                UseFilename = true,
                UniqueFilename = false,
                Overwrite = true,
                Folder = "P1WEBMVC"
            };


            var upload = cloudinary.Upload(uploadParams);

            if (upload.Error != null)
            {

                throw new InvalidOperationException($"Cloudinary upload failed: {upload.Error.Message}");

            }

            return upload.SecureUrl.ToString();


        }
        catch (System.Exception)
        {

            throw;
        }




    }

    public async Task<string> UploadImageAsync(IFormFile image)
    {
        try
        {
            if (image == null || image.Length == 0)
            {
                throw new ArgumentException("Image is missing.");
            }

            var stream = image.OpenReadStream();


            var imageParams = new ImageUploadParams()
            {
                File = new FileDescription(image.FileName, stream),
                UseFilename = true,
                UniqueFilename = false,
                Overwrite = true,
                Folder = "P1WEBMVC"

            };

            var upload = await cloudinary.UploadAsync(imageParams);

            if (upload.Error != null)
            {
                throw new InvalidOperationException($"Upload failed ! {upload.Error.Message}");
            }

            return upload.SecureUrl.ToString();

        }
        catch (System.Exception ex)
        {

            throw new InvalidOperationException(ex.Message);
        }
    }

    public string UploadVideo(IFormFile video)
    {
        throw new NotImplementedException();
    }

    public async Task<string> UploadVideoAsync(IFormFile video)
    {

        if (video == null || video.Length == 0)
        {
            throw new ArgumentException("video File is missing.");
        }

        var stream = video.OpenReadStream();

        var videoUploadParams = new VideoUploadParams
        {
            File = new FileDescription(video.FileName, stream),
            UseFilename = true,
            UniqueFilename = false,
            Overwrite = true,
            Folder = "P1WEBMVC-Reels"
        };

        var upload = await cloudinary.UploadAsync(videoUploadParams);

        if (upload.Error != null)
        {
            throw new InvalidOperationException($"Upload failed ! {upload.Error.Message}");
        }

        return upload.SecureUrl.ToString();


    }
}
