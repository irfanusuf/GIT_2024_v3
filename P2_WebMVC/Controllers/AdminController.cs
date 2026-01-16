using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using P2WebMVC.Data;
using P2WebMVC.Interfaces;
using P2WebMVC.Models.DomainModels;
using P2WebMVC.Types;

namespace P2WebMVC.Controllers
{
    public class AdminController : Controller
    {

        private readonly SqlDbContext dbContext;    // encapsulated feilds
        private readonly ITokenService tokenService;

        private readonly ICloudinaryService cloudinaryService;

        public AdminController(ITokenService tokenService, SqlDbContext dbContext, ICloudinaryService cloudinaryService)
        {
            this.tokenService = tokenService;
            this.dbContext = dbContext;
            this.cloudinaryService = cloudinaryService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult> Dashboard()
        {

            try
            {
                  Guid? userId = HttpContext.Items["UserId"] as Guid?;

                var user = await dbContext.Users.FirstOrDefaultAsync(u => u.UserId == userId);

                if (user?.Role == Role.User)
                {
                    return RedirectToAction("Dashboard", "User");
                }
                else if (user?.Role == Role.StoreKeeper)
                {
                    return RedirectToAction("Dashboard", "StoreKeeper");
                }
                else if (user?.Role == Role.Admin)
                {

                    return View();
                }
                else
                {
                    return RedirectToAction("Login", "User");
                }


            }
            catch (System.Exception ex)
            {
                ViewBag.ErrorMessage = ex.Message;
                return View("Error");

            }


        }

        [Authorize]
        [HttpGet]
        public ActionResult Createproduct(Product product)
        {
            ViewBag.CategoryList = new SelectList(Enum.GetValues(typeof(ProductCategory)));
            return View(product);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Createproduct(Product product, IFormFile image)
        {

            try
            {
                if (image == null || image.Length == 0)
                {
                    ViewBag.ErrorMessage = "Kindly Select the image File";
                    return View();
                }

                var SecureUrl = await cloudinaryService.UploadImageAsync(image);

                product.ProductImage = SecureUrl;

                if (!ModelState.IsValid)
                {
                    ViewBag.ErrorMessage = "All details with * are required";
                    return View(product);
                }

                await dbContext.Products.AddAsync(product);
                await dbContext.SaveChangesAsync();
                TempData["SuccessMessage"] = "Product created SuccesFully!";
                return View(product);

            }
            catch (System.Exception ex)
            {
                ViewBag.ErrorMessage = ex.Message;
                return View("Error");
            }

        }
    }
}
