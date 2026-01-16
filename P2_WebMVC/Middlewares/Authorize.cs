using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using P2WebMVC.Interfaces;

[AttributeUsage(AttributeTargets.All)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // finding a token in cookies 
        var token = context.HttpContext.Request.Cookies["Authorization_Token_Trinkle"];

        //injecting service

        var tokenService = context.HttpContext.RequestServices.GetService(typeof(ITokenService)) as ITokenService;

        // checking token and verifying it 
        if (string.IsNullOrEmpty(token) || tokenService?.VerifyTokenAndGetId(token) == null)
        {
            // extacting returnUrl
            var returnUrl = context.HttpContext.Request.Path + context.HttpContext.Request.QueryString;
            // saving return url in the session
            context.HttpContext.Session.SetString("ReturnUrl", returnUrl);

            // redireccting to login
            context.Result = new RedirectToActionResult("Login", "User", null);
        }
        else
        {
            // i case already token then saving id in the context .items
            context.HttpContext.Items["UserId"] = tokenService.VerifyTokenAndGetId(token);
        }
    }
}
