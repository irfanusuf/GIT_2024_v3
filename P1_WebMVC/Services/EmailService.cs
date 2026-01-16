using System;
using P1WebMVC.Interfaces;
using System.Net.Mail;
using System.Net;
using System.Threading.Tasks;
namespace P1WebMVC.Services;

public class EmailService : IMailService
{

    private readonly string smtpServer;
    private readonly int smtpPort;
    private readonly string smtpUsername;
    private readonly string smtpPassword;


    public EmailService(IConfiguration configuration)
    {

        smtpServer = configuration["Smtp:server"] ?? throw new ArgumentNullException(smtpServer);
        smtpPort = int.TryParse(configuration["Smtp:port"], out var port) ? port : 587;
        smtpUsername = configuration["Smtp:username"] ?? throw new ArgumentNullException("username is not configured");
        smtpPassword = configuration["Smtp:password"] ?? throw new ArgumentNullException("password is not configured !");
    }




    public async Task SendMail(string to, string subject, string body, bool isHtml = false)
    {

        try
        {
            var client = new SmtpClient(smtpServer, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true

            };

            // var MailMessage = new MailMessage(from ,to , subject , body );

            var mailMessage = new MailMessage
            {
                From = new MailAddress("contact@algoacademy.in"),
                Subject = subject,
                Body = body,
                IsBodyHtml = isHtml
            };

            mailMessage.To.Add(to);
            
            await client.SendMailAsync(mailMessage);
        }
        catch (System.Exception ex)
        {

            throw new InvalidOperationException($"Failed to send email: {ex.Message}", ex);
        }


    }



    public async Task SendMail(string to, string from, string subject, string body, bool isHtml = false)
    {

        try
        {
          var client = new SmtpClient(smtpServer, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true

            };

            var mailMessage = new MailMessage(from ,to , subject , body );

            await client.SendMailAsync(mailMessage);
        
      }
        catch (System.Exception ex)
        {


            throw new InvalidOperationException($"Failed to send email: {ex.Message}", ex);
        }


    }
}
