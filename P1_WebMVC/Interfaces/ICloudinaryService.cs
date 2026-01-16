using System;

namespace P1WebMVC.Interfaces;

public interface ICloudinaryService
{
    public string UploadImage(IFormFile image);
    public  Task<string> UploadImageAsync(IFormFile image);
    public string UploadVideo(IFormFile video);
    public Task<string> UploadVideoAsync(IFormFile video);

}
