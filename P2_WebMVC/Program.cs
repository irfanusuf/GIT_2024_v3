using Microsoft.EntityFrameworkCore;
using P2WebMVC.Data;
using P2WebMVC.Interfaces;
using P2WebMVC.Services;


// container
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();



builder.Services.AddSession();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddAuthentication();    // policy add in future




// dependency injection
builder.Services.AddSingleton<ITokenService , TokenService>();
builder.Services.AddSingleton<ICloudinaryService, CloudinaryService>();
builder.Services.AddSingleton<IMailService , EmailService>();

// service injection 
builder.Services.AddDbContext<SqlDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("main")));





var app = builder.Build();




// Configure the HTTP request pipeline.


if (app.Environment.IsProduction())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseExceptionHandler("/Error");



app.UseSession();

app.UseHttpsRedirection();

app.UseStaticFiles();   // use static files present in wwwwroot 

app.UseRouting();

app.UseAuthentication(); 

app.UseAuthorization();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
