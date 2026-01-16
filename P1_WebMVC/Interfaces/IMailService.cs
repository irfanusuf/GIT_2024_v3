using System;

namespace P1WebMVC.Interfaces;

public interface IMailService
{
    public Task SendMail(string to, string from, string subject, string body, bool isHtml = false);

     public Task SendMail(string to ,string subject,  string body , bool isHtml = false );

}
