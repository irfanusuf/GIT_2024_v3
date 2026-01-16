using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using P2WebMVC.Models;

namespace P2WebMVC.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {

        ViewBag.Username = "shahid";
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }


     public IActionResult About()
    {
        return View();
    }



    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
