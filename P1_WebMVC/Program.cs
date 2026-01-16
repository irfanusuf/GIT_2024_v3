// container 

using System.Security.Principal;
using Microsoft.EntityFrameworkCore;
using P1WebMVC.Data;
using P1WebMVC.Interfaces;
using P1WebMVC.Services;

var builder = WebApplication.CreateBuilder(args);

// adding services to the conatiner  

builder.Services.AddControllersWithViews();

// Di // Automated Di 
builder.Services.AddDbContext<SqlDbContext>((options) => options.UseSqlServer(builder.Configuration.GetConnectionString("cloud")));

// dependency Injection 
builder.Services.AddSingleton<ITokenService, TokenService>();
builder.Services.AddSingleton<IMailService, EmailService>();
builder.Services.AddSingleton<ICloudinaryService , CloudinaryService>();


var app = builder.Build();

// if (!app.Environment.IsDevelopment())
// {
//     app.UseExceptionHandler("/Home/Error");
//     app.UseHsts();
// }
// middlewares 

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Explore}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
