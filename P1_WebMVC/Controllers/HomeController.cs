using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using P1WebMVC.Middlewares;
using P1WebMVC.Models;

namespace P1WebMVC.Controllers;

[Authorize]
public class HomeController : Controller
{

    public ActionResult Index()
    {
        return View();
    }

    public ActionResult Privacy()
    {
        return View();
    }

    public ActionResult About()
    {
        return View();
    }

    public ActionResult Contact()
    {
        return View();
    }

}
