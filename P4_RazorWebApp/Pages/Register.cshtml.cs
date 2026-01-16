using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using p4RazorWebApp.Data;
using p4RazorWebApp.Models;

namespace p4RazorWebApp.Pages
{
    public class RegisterModel : PageModel
    {

        private readonly SqlDbContext dbContext;
        public RegisterModel(SqlDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void OnGet()
        {
        }


        public async Task OnPostAsync(User req)
        {

            if (!ModelState.IsValid)
            {
                TempData["ErrorMessage"] = "All the feilds are necessary";
            }

            await dbContext.Users.AddAsync(req);
            await dbContext.SaveChangesAsync();

            TempData["SuccessMessage"] = "User Created Succesfully";

        }




    }
}
