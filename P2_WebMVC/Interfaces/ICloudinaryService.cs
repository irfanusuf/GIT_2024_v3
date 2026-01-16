using System;

namespace P2WebMVC.Interfaces;

public interface ICloudinaryService
{

public  Task <string> UploadImageAsync(IFormFile image);

public Task<string> UploadVideoAsync(IFormFile video);


public Task <string> UploadMultipleImageAsync(IFormFile imgArr);

}
