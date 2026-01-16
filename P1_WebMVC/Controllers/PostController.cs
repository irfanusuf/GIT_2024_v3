
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using P1WebMVC.Data;
using P1WebMVC.Interfaces;
using P1WebMVC.Middlewares;
using P1WebMVC.Models;

namespace P1WebMVC.Controllers
{

    [Authorize]
    public class PostController : Controller
    {

        private readonly SqlDbContext dbContext;
        private readonly ICloudinaryService cloudinaryService;
        public PostController(SqlDbContext dbContext, ICloudinaryService cloudinaryService)
        {
            this.dbContext = dbContext;
            this.cloudinaryService = cloudinaryService;
        }


        [HttpPost]
        public async Task<ActionResult> CreatePost(Post post, IFormFile image, Guid userId)
        {

            try
            {
                if (string.IsNullOrEmpty(post.PostCaption))
                {

                    TempData["ErrorMessage"] = "caption is required !";
                    return RedirectToAction("Dashboard", "User");
                }

                if (image == null || image.Length == 0)
                {
                    TempData["ErrorMessage"] = "Image is required !";
                    return RedirectToAction("Dashboard", "User");

                }

                var SecureUrl = await cloudinaryService.UploadImageAsync(image);


                post.PostpicURL = SecureUrl;
                post.UserId = userId;    // fk 


                var newPost = await dbContext.Posts.AddAsync(post);
                await dbContext.SaveChangesAsync();


                TempData["SuccessMessage"] = "Post uploaded Succesfully !";

                return RedirectToAction("Dashboard", "User");

            }
            catch (System.Exception)
            {

                throw;
            }

        }

        [HttpPost]
        public async Task<ActionResult> CreateReel(Post post, IFormFile video)
        {
            try
            {
                if (string.IsNullOrEmpty(post.PostCaption))
                {

                    TempData["ErrorMessage"] = "caption is required !";
                    return RedirectToAction("Dashboard", "User");
                }

                if (video == null || video.Length == 0)
                {
                    TempData["ErrorMessage"] = "video is required !";
                    return RedirectToAction("Dashboard", "User");
                }

                var SecureUrl = await cloudinaryService.UploadVideoAsync(video);

                post.PostVideoURL = SecureUrl;
                post.UserId = HttpContext.Items["userId"] as Guid?;


                await dbContext.Posts.AddAsync(post);
                await dbContext.SaveChangesAsync();

                TempData["SuccessMessage"] = "Reel Uploaded Succesfully !";
                return RedirectToAction("Dashboard", "User");
            }
            catch (System.Exception)
            {

                TempData["ErrorMessage"] = "Something Went Wrong";
                return RedirectToAction("Dashboard", "User");
                throw;
            }

        }

        [HttpPost]
        public async Task<ActionResult> AddComment(Guid postId, Comment comment)
        {

            // fetch userid // token // redirect login // register 

            var returnUrl = Request.Headers["Referer"].ToString();

            Guid? userId = HttpContext.Items["userId"] as Guid?;

            if (userId == null)
            {
                TempData["ErrorMessage"] = "User not authenticated!";
                return RedirectToAction("Login", "User");
            }

            comment.UserId = userId.Value;    /// fetched userId from middleware 
            comment.PostId = postId;   // query param

            await dbContext.Comments.AddAsync(comment);

            await dbContext.SaveChangesAsync();

            TempData["SuccessMessage"] = "Comment Added";

            return Redirect(returnUrl);
        }

        [HttpGet]
        public async Task<ActionResult> Like(Guid postId)
        {
            // Extract the return URL from the Referer header, fallback to Explore if not available

            var returnUrl = Request.Headers["Referer"].ToString();


            if (string.IsNullOrEmpty(returnUrl))
            {
                returnUrl = Url.Action("Index", "Explore");
            }


            // fetch userid // token // redirect to  login if token is not present or not valid 
            Guid? userId = HttpContext.Items["userId"] as Guid?;

            //logic for like

            var user = await dbContext.Users.FindAsync(userId);

            var post = await dbContext.Posts.FindAsync(postId);


            if (post == null || user == null)
            {
                TempData["ErrorMessage"] = "Some Error !";
                return RedirectToAction("Index", "Explore");
            }

            post.Likes.Add(user);

            await dbContext.SaveChangesAsync();

            TempData["SuccessMessage"] = "Liked the Post !";


            // redirect to return url 
            return Redirect(returnUrl);

        }

        [HttpGet]
        public async Task<ActionResult> RemoveLike(Guid postId)
        {


            var returnUrl = Request.Headers["Referer"].ToString();

            //  var returunYrl =    HttpContext.Request.Path + HttpContext.Request.QueryString;

            if (string.IsNullOrEmpty(returnUrl))
            {
                returnUrl = Url.Action("Index", "Explore");
            }

            // fetch userid // token // redirect to  login if token is not present or not valid 
            Guid? userId = HttpContext.Items["userId"] as Guid?;
            //logic for like

            var user = await dbContext.Users.FindAsync(userId);

            var post = await dbContext.Posts.Include(post => post.Likes).FirstOrDefaultAsync(post => post.PostId == postId);

            if (post == null || user == null || post.Likes == null)
            {
                TempData["ErrorMessage"] = "Some Error !";
                return RedirectToAction("Index", "Explore");
            }

            var remove = post.Likes.Remove(user);

            if (remove)
            {
                await dbContext.SaveChangesAsync();
                TempData["SuccessMessage"] = "Like Removed !";
            }
            else
            {
                TempData["ErrorMessage"] = "Some Error !";
            }

            return Redirect(returnUrl);

        }

    }
}
