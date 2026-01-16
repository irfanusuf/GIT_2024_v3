using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using P2WebMVC.Data;
using P2WebMVC.Interfaces;
using P2WebMVC.Models;
using P2WebMVC.Models.DomainModels;
using P2WebMVC.Models.ViewModels;

namespace P2WebMVC.Controllers
{
    public class UserController : Controller
    {

        private readonly SqlDbContext sqlDbContext;    // encapsulated feilds
        private readonly ITokenService tokenService;

        private readonly IMailService mailService;

        public UserController(SqlDbContext sqlDbContext, ITokenService tokenService, IMailService mailService)
        {
            this.sqlDbContext = sqlDbContext;
            this.tokenService = tokenService;
            this.mailService = mailService;
        }


        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Register(User user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    ViewBag.errorMessage = "All details Required!";
                    return View();
                }
                //   var existingUser = await sqlDbContext.Users.FindAsync(user.UserId);   // findAsync is for PK

                var existingUser = await sqlDbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);   // findAsync is for PK



                if (existingUser != null)
                {

                    ViewBag.errorMessage = "User Already Exists";
                    return View();

                }

                var encryptPass = BCrypt.Net.BCrypt.HashPassword(user.Password);

                user.Password = encryptPass;



                var newUser = await sqlDbContext.Users.AddAsync(user);
                await sqlDbContext.SaveChangesAsync();


                // ViewBag.successMessage = "User Created Succefully!";

                return RedirectToAction("Login");
            }
            catch (Exception ex)
            {
                ViewBag.errorMessage = ex.Message;
                return View("Error");
            }


        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginView user)
        {

            try
            {

                if (!ModelState.IsValid)
                {
                    ViewBag.errorMessage = "All credentials Required!";
                    return View();
                }

                var existingUser = await sqlDbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);


                if (existingUser == null)
                {

                    ViewBag.errorMessage = "User not Found!";
                    return View();

                }

                var checkPass = BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password);

                if (checkPass)
                {

                    var token = tokenService.CreateToken(existingUser.UserId, user.Email, existingUser.Username, 60 * 24);

                    //    Console.WriteLine(token);

                    HttpContext.Response.Cookies.Append("Authorization_Token_Trinkle", token, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = false,
                        SameSite = SameSiteMode.Lax,
                        Expires = DateTimeOffset.UtcNow.AddHours(24)
                    });


                    var returnUrl = HttpContext.Session.GetString("ReturnUrl");

                    HttpContext.Session.Remove("ReturnUrl");

                    // token ko cookies may save kerna .... // done 9 april 
                    if (string.IsNullOrEmpty(returnUrl))
                    {
                        return RedirectToAction("Dashboard", "Admin");
                    }
                    else
                    {
                        // redirect to return Url 
                        return Redirect(returnUrl);
                    }

                }


                else
                {
                    ViewBag.errorMessage = "PassWord incorrect!";
                    return View();
                }




            }
            catch (Exception ex)
            {

                ViewBag.errorMessage = ex.Message;
                return View("Error");
            }




        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult> Cart()
        {

            try
            {
                Guid? userId = HttpContext.Items["UserId"] as Guid?;

                var cart = await sqlDbContext.Carts.FirstOrDefaultAsync(c => c.UserId == userId);

                if (cart == null)
                {
                    ViewBag.ErrorMessage = "Cart Not Found!";
                    return View();
                }

                var cartProducts = await sqlDbContext.CartProducts.Include(cp => cp.Product).Where(cp => cp.CartId == cart.CartId).ToListAsync();


                var viewModel = new CartView
                {
                    Cart = cart,
                    CartProducts = cartProducts

                };

                return View(viewModel);

            }
            catch (System.Exception ex)
            {
                ViewBag.ErrorMessage = ex.Message;
                return View();

            }



        }


        [Authorize]    // middlewares
        [HttpPost]
        public async Task<ActionResult> CreateAddress(Address address, Guid CartId)
        {

            Guid? userId = HttpContext.Items["UserId"] as Guid?;

            if (!ModelState.IsValid)
            {

                TempData["ErrorMessage"] = "All the  feilds with the * are required ";
                return RedirectToAction("CheckOut", "Order", new { CartId });

            }

            var existingAddress = await sqlDbContext.Addresses.FirstOrDefaultAsync(a => a.UserId == userId);

            if (existingAddress == null)
            {
                // create 
                address.UserId = (Guid)userId;    // required 
                await sqlDbContext.Addresses.AddAsync(address);

            }
            else
            {
                // update 
                existingAddress.FirstName = address.FirstName;
                existingAddress.LastName = address.LastName;
                existingAddress.Street = address.Street;
                existingAddress.City = address.City;
                existingAddress.District = address.District;
                existingAddress.State = address.State;
                existingAddress.Country = address.Country;
                existingAddress.Pincode = address.Pincode;
                existingAddress.Phone = address.Phone;
                existingAddress.Landmark = address.Landmark;

            }


            await sqlDbContext.SaveChangesAsync();

            TempData["SuccessMessage"] = "Address Updated!";
            return RedirectToAction("CheckOut", "Order", new { CartId });
        }

        [Authorize]
        [HttpGet]
        public ActionResult Orders(Guid UserId)
        {

            return View();


        }



        public async Task<ActionResult> ForgotPassWord()
        {
            try
            {
                 await mailService.SendEmailAsync("irfanusuf33@gmail.com", "Forgot Password", "Your otp is 1234", true);
            return RedirectToAction("Login");
            }
            catch (System.Exception ex)
            {
                ViewBag.ErrorMessage = ex.Message;
                return View("Error");
            }

          

        }

    }
}





