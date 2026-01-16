using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using P2WebMVC.Data;
using P2WebMVC.Interfaces;
using P2WebMVC.Models.DomainModels;
using P2WebMVC.Models.JunctionModels;
using P2WebMVC.Models.ViewModels;
using P2WebMVC.Types;

namespace P2WebMVC.Controllers
{
  public class ProductController : Controller
  {


    private readonly SqlDbContext dbContext;

    private readonly ITokenService tokenService;


    public ProductController(SqlDbContext dbContext, ITokenService tokenService)
    {
      this.dbContext = dbContext;
      this.tokenService = tokenService;
    }

    // GET: ProductController

    [HttpGet]
    public async Task<ActionResult> Index(ProductCategory category)
    {


      try
      {

        if (category == ProductCategory.General)
        {

          var products = await dbContext.Products.Where(p => p.IsActive == true).ToListAsync();  // db query 

          if (products == null || products.Count == 0)
          {

            ViewBag.Message = "No products Available!";
            ViewBag.Category = category;
            return View();

          }
          else
          {

            var viewModel = new ProductView
            {
              Products = products
            };

            ViewBag.Category = category;
            return View(viewModel);

          }
        }
        else
        {

          var products = await dbContext.Products.Where(p => p.IsActive == true && p.Category == category).ToListAsync();  // db query 

          if (products == null || products.Count == 0)
          {

            ViewBag.Message = "No products Available!";
            ViewBag.Category = category;
            return View();

          }
          else
          {

            var viewModel = new ProductView
            {
              Products = products
            };

            ViewBag.Category = category;
            return View(viewModel);

          }
        }
      }
      catch (System.Exception ex)
      {
        ViewBag.ErrorMessage = ex.Message;
        return View("Error");
        throw;
      }

    }

    [HttpGet]
    public async Task<IActionResult> Details(Guid ProductId)
    {
      try
      {
        var product = await dbContext.Products.FindAsync(ProductId);

        var viewModel = new ProductView
        {
          Product = product

        };

        return View(viewModel);    //empty view // after passing the view model view now has data 


      }
      catch (System.Exception ex)
      {

        ViewBag.ErrorMessage = ex.Message;
        return View("Error");

      }
    }


    [Authorize]
    [HttpPost]
    public async Task<IActionResult> AddToCart(Guid ProductId, string? Color, int Quantity, string? Size)
    {
      try
      {

        if (HttpContext.Items["UserId"] is not Guid userId)
        {
          TempData["ErrorMessage"] = "User not Found!";
          return RedirectToAction("Login", "User");
        }

        var product = await dbContext.Products.FindAsync(ProductId);

        if (product == null)
        {
          TempData["ErrorMessage"] = "Product Not Found!";
          return RedirectToAction("Cart", "User");
        }



        var cart = await dbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
        {
          cart = new Cart
          {
            UserId = (Guid)userId,
            CartTotal = 0,
            CartProducts = []
          };
          await dbContext.Carts.AddAsync(cart);
        }


        var existingItem = await dbContext.CartProducts
            .FirstOrDefaultAsync(cp => cp.CartId == cart.CartId && cp.ProductId == ProductId);

        if (existingItem == null)
        {
          var cartProduct = new CartProduct
          {
            CartId = cart.CartId,
            ProductId = ProductId,
            Quantity = Quantity,
            Color = Color,
            Size = Size
          };
          await dbContext.CartProducts.AddAsync(cartProduct);

        }
        else
        {
          existingItem.Quantity += Quantity;

        }
        cart.CartTotal += Quantity * product.ProductPrice;
        await dbContext.SaveChangesAsync();


        return RedirectToAction("Cart", "User");
      }
      catch (Exception ex)
      {
        ViewBag.ErrorMessage = ex.Message;
        return View("Error");
      }
    }


    [Authorize]
    [HttpGet]
    public async Task<IActionResult> AddToCart(Guid ProductId)
    {
      try
      {

        if (HttpContext.Items["UserId"] is not Guid userId)
        {
          TempData["ErrorMessage"] = "User not Found!";
          return RedirectToAction("Login", "User");
        }

        var product = await dbContext.Products.FindAsync(ProductId);

        if (product == null)
        {
          TempData["ErrorMessage"] = "Product Not Found!";
          return RedirectToAction("Cart", "User");
        }



        var cart = await dbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);

        if (cart == null)
        {
          cart = new Cart
          {
            UserId = (Guid)userId,
            CartTotal = 0,
            CartProducts = []
          };
          await dbContext.Carts.AddAsync(cart);
        }


        var existingItem = await dbContext.CartProducts
            .FirstOrDefaultAsync(cp => cp.CartId == cart.CartId && cp.ProductId == ProductId);

        if (existingItem == null)
        {
          var cartProduct = new CartProduct
          {
            CartId = cart.CartId,
            ProductId = ProductId,
            Quantity = 1,
            Color = "default",
            Size = "Size"
          };
          await dbContext.CartProducts.AddAsync(cartProduct);

        }
        else
        {
          existingItem.Quantity += 1;

        }
        cart.CartTotal += 1 * product.ProductPrice;
        await dbContext.SaveChangesAsync();


        return RedirectToAction("Cart", "User");
      }
      catch (Exception ex)
      {
        ViewBag.ErrorMessage = ex.Message;
        return View("Error");
      }
    }
  }
}
