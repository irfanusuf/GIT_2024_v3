using System;

namespace P2WebMVC.Interfaces;

public interface IMailService
{


    public Task SendEmailAsync(string emailAddress , string subject ,  string body, bool isHtml = true );
}
