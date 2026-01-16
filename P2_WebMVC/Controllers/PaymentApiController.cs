using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using P2WebMVC.Data;
using P2WebMVC.Interfaces;
using P2WebMVC.Models.ViewModels;
using P2WebMVC.Services;

namespace P2WebMVC.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PaymentApiController : ControllerBase
    {


        private readonly SqlDbContext dbContext;
        private readonly ITokenService tokenService;
        private readonly RazorPayService razorpayService = new();

        public PaymentApiController(SqlDbContext dbContext, ITokenService tokenService)
        {
            this.dbContext = dbContext;
            this.tokenService = tokenService;
        }



        [HttpGet("test")]

        public IActionResult Test()
        {
            return Ok(new { message = "Api server Working" });
        }



       // api 

        [HttpPost("CreatePaymentIntent")]
        public IActionResult CreatePaymentIntent(PaymentIntentModel request)
        {

            if (Guid.Empty == request.OrderId  || request.Amount <= 0 || string.IsNullOrEmpty(request.Currency))
            {
                return BadRequest("Invalid payment details.");   // status code 400 
            }

            //  call payment gateway to create order // gernarate reciept id === our  orderid
            var order = razorpayService.CreateOrder(request.Amount, request.Currency, request.OrderId);


            if (order == null)
            {
                return StatusCode(500, new { message = "Something Went Wrong!" });
            }

            return Ok(new
            {
                orderId = order["id"].ToString(),
                entity = order["entity"].ToString(),
                amount = order["amount"],
                amountPaid = order["amount_paid"],
                amountDue = order["amount_due"],
                currency = order["currency"].ToString(),
                receipt = order["receipt"].ToString(),
                status = order["status"].ToString(),
                attempts = order["attempts"],
                createdAt = order["created_at"]
            });
        }
    }
}
