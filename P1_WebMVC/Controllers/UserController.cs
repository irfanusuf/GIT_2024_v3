using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using P1WebMVC.Data;
using P1WebMVC.Interfaces;
using P1WebMVC.Middlewares;
using P1WebMVC.Models;
using P1WebMVC.Models.ViewModels;

namespace P1WebMVC.Controllers
{
    public class UserController : Controller
    {

        private readonly SqlDbContext dbContext;
        private readonly ITokenService tokenService;
        private readonly IMailService mailService;
        private readonly ICloudinaryService cloudinaryService;

        public UserController(SqlDbContext dbContext, ITokenService tokenService, IMailService mailService, ICloudinaryService cloudinaryService)
        {
            this.dbContext = dbContext;
            this.tokenService = tokenService;
            this.mailService = mailService;
            this.cloudinaryService = cloudinaryService;
        }


        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Register(User user)
        {

            // validation 
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                ViewBag.ErrorMessage = "All the feilds are required!";
                return View();
            }

            if (user.Password.Length < 8)
            {
                ViewBag.ErrorMessage = "Password is less than 8 characters";
                return View();
            }


            // if existing user     LINQ query 
            var existingUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);



            if (existingUser != null)
            {
                ViewBag.ErrorMessage = "User with this email already exists";
                return View();
            }

            // password encrypt
            var passEncrypt = BCrypt.Net.BCrypt.HashPassword(user.Password);

            user.Password = passEncrypt;


            var newUser = await dbContext.Users.AddAsync(user);

            // db save 
            await dbContext.SaveChangesAsync();


            if (newUser != null)
            {
                ViewBag.SuccessMessage = "Account Created Succesfully!";
            }
            else
            {
                ViewBag.ErrorMessage = "Something Went wrong Try again ";
            }
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(string Email, string Password)
        {

            // validation 
            if (string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(Password))
            {
                ViewBag.ErrorMessage = "Email and password both required";
                return View();
            }
            // check user

            var existingUser = await dbContext.Users.FirstOrDefaultAsync(u => u.Email == Email);   // single user return 

            if (existingUser == null)
            {
                ViewBag.ErrorMessage = "No User Found with this Email";
                return View();
            }

            // pass verify
            var passVerify = BCrypt.Net.BCrypt.Verify(Password, existingUser.Password);

            if (passVerify)
            {
                // session mangement // jwt token then send that to cookies 

                var token = tokenService.CreateToken(existingUser.UserId, Email, existingUser.Username, 7);

                // send the token in cookies // tommorow // done 
                HttpContext.Response.Cookies.Append("authToken", token, new CookieOptions
                {
                    Secure = false,
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.Now.AddDays(7)

                });
                // ViewBag.SuccessMessage = "User Login Succesfull !";
                TempData["SuccessMessage"] = "User login succesFull";
                return RedirectToAction("Dashboard");
            }
            else
            {
                ViewBag.ErrorMessage = "Incorrect Password !";
                return View();
            }
        }

        [HttpGet]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> ForgotPassword(string Email)
        {
            // email per otp send kerna hai ager user hoga 
            try
            {
                var user = await dbContext.Users.FirstOrDefaultAsync(user => user.Email == Email);

                if (user == null)
                {
                    ViewBag.ErrorMessage = "User doesnot Exist in our Databases";
                    return View();
                }

                // token which is valid for 5 minutes
                var token = tokenService.CreateToken(user.UserId, user.Email, user.Username);

                var passwordResetLink = $"http://localhost:5130/user/updatePassword?token={token}";

                // email send kerna 
                await mailService.SendMail(Email, "Password Reset link ", $"We have accepted your request for password update ,kindly find the password  reset link below : {passwordResetLink}   ", false);


                ViewBag.SuccessMessage = "Email  with password reset link  sent to you address successfully !";

                return View();


            }
            catch (System.Exception)
            {

                throw;
            }
        }

        [HttpGet]
        public ActionResult UpdatePassword(string token)
        {
            try
            {
                var userId = tokenService.VerifyTokenAndGetId(token);


                var model = new
                {
                    userId
                };
                // DTO  in the view 
                return View(model);
            }
            catch (System.Exception)
            {
                ViewBag.ErrorMessage = "Sorry the password reset link is  Expired , Kindly request for  new link !";
                return View();
            }

        }

        [HttpPost]
        public async Task<ActionResult> UpdatePassword(string Password, string ConfirmPassword, Guid userId)
        {

            if (string.IsNullOrEmpty(Password) || string.IsNullOrEmpty(ConfirmPassword))
            {
                ViewBag.ErrorMessage("password & confirmPassword both are required");
                return View();
            }

            if (Password != ConfirmPassword)
            {
                ViewBag.ErrorMessage("Passwords Does not match");
                return View();
            }

            var user = await dbContext.Users.FindAsync(userId);

            if (user == null)
            {
                TempData["ErrorMessage"] = "User not Found !";
                return RedirectToAction("login");
            }

            var encryptPass = BCrypt.Net.BCrypt.HashPassword(Password);

            user.Password = encryptPass;

            await dbContext.SaveChangesAsync();


            TempData["SuccessMessage"] = "Password Changed Successfully !";

            return RedirectToAction("login");


        }


        [Authorize]
        [HttpPost]
        public async Task<ActionResult> UploadProfile(IFormFile image)
        {
            // actual upload 

            if (image == null || image.Length == 0)
            {
                TempData["ErrorMessage"] = "Image is missing !";
                return RedirectToAction("dashboard");
            }

            if (HttpContext.Items["user"] is User user)
            {

                var SecureUrl = await cloudinaryService.UploadImageAsync(image);

                user.ProfilePic = SecureUrl;

                await dbContext.SaveChangesAsync();

                TempData["SuccessMessage"] = "Profile Pic uploaded Successfully !";
                return RedirectToAction("Dashboard");

            }
            else
            {
                TempData["ErrorMessage"] = "Some Error Kindly try again after sometime !!";

                return RedirectToAction("Dashboard");
            }

        }

    }
}

