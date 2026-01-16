using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using P2WebMVC.Data;
using P2WebMVC.Interfaces;
using P2WebMVC.Models.DomainModels;
using P2WebMVC.Models.JunctionModels;
using P2WebMVC.Models.ViewModels;

namespace P2WebMVC.Controllers
{
    [Authorize]
    public class OrderController : Controller
    {

        private readonly SqlDbContext dbContext;    // encapsulated feilds
        private readonly ITokenService tokenService;

        private readonly IMailService mailService;

        public OrderController(SqlDbContext dbContext, ITokenService tokenService, IMailService mailService)
        {
            this.dbContext = dbContext;
            this.tokenService = tokenService;
            this.mailService = mailService;
        }


        [HttpGet]
        public async Task<ActionResult> CheckOut(Guid CartId)
        {


            Guid? userId = HttpContext.Items["UserId"] as Guid?;
            // list // in future 
            var address = await dbContext.Addresses.FirstOrDefaultAsync(a => a.UserId == userId); // slow   // n log n 
            var cart = await dbContext.Carts.FindAsync(CartId);// fast    O(1)

            if (cart != null)
            {
                var cartProducts = await dbContext.CartProducts.Include(cp => cp.Product).Where(cp => cp.CartId == cart.CartId).ToListAsync();
                var viewmodel = new CartView
                {
                    Cart = cart,
                    Address = address,
                    CartProducts = cartProducts
                };
                return View(viewmodel);
            }
            ViewBag.errorMessage = "No Cart Found!";
            return View();
        }



        [HttpGet]
        public async Task<ActionResult> Create(Guid CartId)
        {
            try
            {
                Guid? userId = HttpContext.Items["UserId"] as Guid?;

                var user = await dbContext.Users.FindAsync(userId);

                var address = await dbContext.Addresses.FirstOrDefaultAsync(a => a.UserId == userId);

                var cart = await dbContext.Carts
                    .Include(c => c.CartProducts)
                    .ThenInclude(cp => cp.Product)
                    .FirstOrDefaultAsync(c => c.CartId == CartId);

                if (cart != null && address != null && cart.CartProducts.Count > 0)
                {
                    var order = new Order
                    {
                        UserId = (Guid)userId,
                        TotalPrice = cart.CartTotal,
                        AddressId = address.AddressId,
                        OrderProducts = [],
                        OrderStatus = Types.OrderStatus.Pending,
                        PaymentStatus = Types.PaymentStatus.pending
                    };

                    var orderProducts = cart.CartProducts.Select(cp => new OrderProduct
                    {
                        OrderId = order.OrderId,
                        ProductId = cp.ProductId,
                        Quantity = cp.Quantity,
                        Size = cp.Size,
                        Color = cp.Color,
                        Weight = cp.Weight
                    }).ToList();

                    order.OrderProducts = orderProducts;

                    await dbContext.Orders.AddAsync(order);


                     await mailService.SendEmailAsync(user.Email, "Order Succesfull", $"Your Order of Rs {order.TotalPrice} has been created ", true);

                    if (cart?.CartProducts != null)
                    {
                        dbContext.CartProducts.RemoveRange(cart.CartProducts);
                        cart.CartTotal = 0;
                    }

                    await dbContext.SaveChangesAsync();

                  


                    TempData["SuccessMessage"] = "order created Succesfully";
                    return RedirectToAction("Payment", "Order", new { order.OrderId });
                }
                else
                {
                    TempData["ErrorMessage"] = "Some Error with Cart!.Try again!";
                    return RedirectToAction("checkout", new { CartId });
                }

            }
            catch (System.Exception ex)
            {
                ViewBag.ErrorMessage = ex.Message;
                return View("Error");

            }

        }



        [HttpGet]
        public async Task<ActionResult> Recent()
        {

            Guid? userId = HttpContext.Items["UserId"] as Guid?;

            var orders = await dbContext.Orders.Where(o => o.UserId == userId).ToListAsync();

            if (orders == null)
            {
                ViewBag.OrderCount = "No recent Orders!";
                return View();
            }


            var viewModel = new OrderView
            {
                Orders = orders
            };



            return View(viewModel);
        }





        [HttpGet]

        public async Task<ActionResult> Payment(Guid OrderId)
        {

            try
            {
                var order = await dbContext.Orders.FindAsync(OrderId);

                if (order == null)
                {
                    ViewBag.ErrorMessage = "No order Found!";
                    return View();
                }

                var viewModel = new OrderView
                {
                    Order = order
                };

                return View(viewModel);
            }
            catch (System.Exception ex)
            {

                ViewBag.ErrorMessage = ex.Message;
                return View();
            }


        }


        [HttpGet]

        public async Task<ActionResult> PaymentSuccess(Guid OrderId)
        {
            try
            {
                var order = await dbContext.Orders.FindAsync(OrderId);

                if (order == null)
                {
                    ViewBag.ErrorMessage = "No order Found!";
                    return View();
                }
                order.PaymentStatus = Types.PaymentStatus.Succesfull;
                order.OrderStatus = Types.OrderStatus.confirmed;
                order.PaymentMode = Types.PaymentMode.RazorPay;
                await dbContext.SaveChangesAsync();
                TempData["SuccessMessage"] = "Your order Placed Succesfully!";
                return RedirectToAction("Orders", "User", new { order?.UserId });

            }
            catch (System.Exception ex)
            {
                ViewBag.ErrorMessage = ex.Message;
                return View();
            }
        }


        [HttpGet]

        public async Task<ActionResult> PaymentFailure(Guid OrderId)
        {
            try
            {
                var order = await dbContext.Orders.FindAsync(OrderId);

                if (order == null)
                {
                    ViewBag.ErrorMessage = "No order Found!";
                    return View();
                }
                order.PaymentStatus = Types.PaymentStatus.Error;
                order.OrderStatus = Types.OrderStatus.Pending;
                order.PaymentMode = Types.PaymentMode.RazorPay;

                await dbContext.SaveChangesAsync();

                TempData["ErrorMessage"] = "Some Error in the Payment gateway !";

                return RedirectToAction("Orders", "Users", new { order?.UserId });

            }
            catch (System.Exception ex)
            {

                ViewBag.ErrorMessage = ex.Message;
                return View();
            }


        }





    }

}
