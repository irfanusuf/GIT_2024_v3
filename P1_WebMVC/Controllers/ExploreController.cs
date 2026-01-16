using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using P1WebMVC.Data;
using P1WebMVC.Interfaces;
using P1WebMVC.Middlewares;
using P1WebMVC.Models;
using P1WebMVC.Models.ViewModels;

namespace P1WebMVC.Controllers
{
    public class ExploreController : Controller
    {
        // GET: ExploreController

        private readonly SqlDbContext dbContext;


        public ExploreController(SqlDbContext dbContext)
        {
            this.dbContext = dbContext;

        }

        // attribute flag 

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> Index()
        {
            try
            {
                var posts = await dbContext.Posts
                .Include(posts => posts.Comments).ThenInclude(comment => comment.User)
                .Include(posts => posts.Likes)
                // .Where(posts => posts.PostpicURL != null)
                .ToListAsync();

                var exploreViewModel = new ExploreViewModel
                {
                    Posts = posts,
                    LoggedInUser = HttpContext.Items["user"] as User
                };

                // DTO
                return View(exploreViewModel);
            }
            catch (System.Exception)
            {
                throw;
            }
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult> Reels()
        {
            try
            {
                var posts = await dbContext.Posts
                .Include(posts => posts.Comments).ThenInclude(comment => comment.User)
                .Include(posts => posts.Likes)
                .Where(posts => posts.PostVideoURL != null)
                .ToListAsync();

                var exploreViewModel = new ExploreViewModel
                {
                    Posts = posts,
                    LoggedInUser = HttpContext.Items["user"] as User
                };

                // DTO
                return View(exploreViewModel);
            }
            catch (System.Exception)
            {
                throw;
            }
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult> Profile(Guid userId)
        {
            try
            {
                var posts = await dbContext.Posts
                .Include(posts => posts.Comments).ThenInclude(comment => comment.User)
                .Include(posts => posts.Likes)
                .Where(post => post.UserId == userId)
                .ToListAsync();

                var profileUser = await dbContext.Users.FindAsync(userId);
                var users = await dbContext.Users.Where(user => user.Posts.Count > 1).ToListAsync();

                var exploreViewModel = new ExploreViewModel
                {
                    Posts = posts,
                    LoggedInUser = HttpContext.Items["user"] as User,
                    ProfileUser = profileUser,
                    SuggestedUsers = users
                };

                return View(exploreViewModel);
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}
