using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using P0_ClassLibrary.Interfaces;
using P10_WebApi.Models;
using P10_WebApi.Models.Dtos;
using P10_WebApi.Services;

namespace P10_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly MongoDbService db;
        private readonly ICloudinaryService cloudinaryService;
        private readonly ITokenService tokenService;
        private readonly IMailService mailService;

        public UserController(MongoDbService mongoDb, ICloudinaryService cloudinaryService, ITokenService tokenService, IMailService mailService)
        {
            db = mongoDb;
            this.cloudinaryService = cloudinaryService;
            this.tokenService = tokenService;
            this.mailService = mailService;

        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register(User user)
        {
            // validation 
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {

                return BadRequest(new { message = "All the feilds are required!" });
            }

            if (user.Password.Length < 8)
            {

                return BadRequest(new { message = "Password is less than 8 characters" });
            }


            var existingUser = await db.Users.Find(u => u.Email == user.Email).FirstOrDefaultAsync();



            if (existingUser != null)
            {

                return BadRequest(new { message = "User with this email already exists" });
            }


            var passEncrypt = BCrypt.Net.BCrypt.HashPassword(user.Password);

            user.Password = passEncrypt;

            await db.Users.InsertOneAsync(user);


            return Ok(new { message = "User registered Succesfully !" });
        }


        [HttpPost("Login")]
        public async Task<ActionResult> Login(User req)
        {
            // validation 
            if (string.IsNullOrEmpty(req.Username) || string.IsNullOrEmpty(req.Email) || string.IsNullOrEmpty(req.Password))
            {
                return BadRequest(new { message = "All the feilds are required!" });
            }

            var existingUser = await db.Users
            .Find(u => u.Email == req.Email || u.Username == req.Username)
            .FirstOrDefaultAsync();


            if (existingUser == null || existingUser.UserId == null)
            {
                return BadRequest(new { message = "No User Found with this Email" });

            }

            // pass verify
            var passVerify = BCrypt.Net.BCrypt.Verify(req.Password, existingUser.Password);

            if (passVerify)
            {
                // session mangement // jwt token then send that to cookies 

                var token = tokenService.CreateToken(existingUser.UserId, req.Email, existingUser.Username, 7);
                
                  
        
                // send the token in cookies // tommorow // done 
                HttpContext.Response.Cookies.Append("P10WebApi_AuthToken", token, new CookieOptions
                {
                    Secure = false,
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.Now.AddDays(7)

                });
                // ViewBag.SuccessMessage = "User Login Succesfull !";

                return Ok(new { message = "User login succesFull" });
            }
            else
            {

                return BadRequest(new { message = "Incorrect Password !" });
            }
        }


        [HttpPost("forgotpassword")]
        public async Task<ActionResult> ForgotPassword(string email)
        {
            // email per otp send kerna hai ager user hoga 

            var filter = Builders<User>.Filter.Eq(u => u.Email, email);
            var user = await db.Users.Find(filter).FirstOrDefaultAsync();
            if (user == null)
            {
                return BadRequest(new { message = "user not Found !" });
            }

            var random = new Random();    // security threat 

            var otp = random.Next(100000, 999999); //  with 5 min valid 

            var encryptOtp = BCrypt.Net.BCrypt.HashPassword(otp.ToString());
        
            var update = Builders<User>.Update
            .Set(u => u.OTP, encryptOtp )
            .Set(u => u.OTPExpiry , DateTime.UtcNow.AddMinutes(30));

            await db.Users.UpdateOneAsync(filter, update);

    
            // email send kerna 
            await mailService.SendEmailAsync(email, "Password Reset Otp ",
             $"We have accepted your request for password update ,kindly find the OTP  below  , Remember only valid for 5 minutes: {otp}", false);


            return Ok(new { message = "Email  with OTP  sent to you address successfully !" });

        }


        [HttpPost("updatepassword")]
        public async Task<ActionResult> UpdatePassword(UpdatePass req)
        {

            if (string.IsNullOrEmpty(req.Password) || string.IsNullOrEmpty(req.ConfirmPassword))
            {
                return BadRequest(new { message = "password & confirmPassword both are required" });
            }

            if (req.Password != req.ConfirmPassword)
            {
                return BadRequest(new { message = "Passwords Does not match" });
            }

            var filter = Builders<User>.Filter.Eq(u => u.Email , req.Email);

            var user = await db.Users.Find(filter).FirstOrDefaultAsync();


            var verifyOtp = BCrypt.Net.BCrypt.Verify(req.OTP, user.OTP);

            if (verifyOtp  && user.OTPExpiry > DateTime.UtcNow)
            {
              
            var encryptPass = BCrypt.Net.BCrypt.HashPassword(req.Password);


            var update = Builders<User>.Update
            .Set(u => u.Password, encryptPass)
            .Set(u => u.OTP , null)
            .Set(u => u.OTPExpiry , null);


            await db.Users.UpdateOneAsync(filter, update);

            return Ok(new { message = "Password Changed Successfully !" });

            }
            else
            {
                
            return BadRequest(new { message = "Incorrect otp or otp is  Expired !" });
            }




        }



        // [HttpPost]
        // public async Task<ActionResult> UploadProfile(IFormFile image)
        // {
        //     // actual upload 

        //     if (image == null || image.Length == 0)
        //     {
        //         TempData["ErrorMessage"] = "Image is missing !";
        //         return RedirectToAction("dashboard");
        //     }

        //     if (HttpContext.Items["user"] is User user)
        //     {

        //         var SecureUrl = await cloudinaryService.UploadImageAsync(image , "profilePic");

        //         user.ProfilePic = SecureUrl;

        //         await dbContext.SaveChangesAsync();

        //         TempData["SuccessMessage"] = "Profile Pic uploaded Successfully !";
        //         return RedirectToAction("Dashboard");

        //     }
        //     else
        //     {
        //         TempData["ErrorMessage"] = "Some Error Kindly try again after sometime !!";

        //         return RedirectToAction("Dashboard");
        //     }

        // }



    }
}
