using System;
using Razorpay.Api;

namespace P2WebMVC.Services;

public class RazorPayService
{

    private readonly string key = "rzp_test_RgG9AwfnysizZu";         // test keys 
    private readonly string secret = "1CaqfrrZdfeKKOIdPypjADfr";       // appsettings.json for security reasons

    public Order? CreateOrder(int amount, string currency, Guid orderId)
    {


        RazorpayClient client = new(key, secret);     // connnected to razor pay client 


        Dictionary<string, object> options = new()
         {
                { "amount", amount * 100 },
                { "currency", currency },
                { "receipt", orderId },
                { "payment_capture", 1 }
            };


        Order order = client.Order.Create(options);
        
        return order;


    }







}




























// public class RazorPayService
// {
//     private readonly string key = "rzp_test_RgG9AwfnysizZu";
//     private readonly string secret = "1CaqfrrZdfeKKOIdPypjADfr";

//     public Order? CreateOrder(int amount, string currency , Guid orderId)
//     {
//         try
//         {
//             RazorpayClient client = new(key, secret);

//             Dictionary<string, object> options = new Dictionary<string, object>
//             {
//                 { "amount", amount * 100 }, 
//                 { "currency", currency },
//                 { "receipt", orderId },
//                 { "payment_capture", 1 } 
//             };

//             Order order = client.Order.Create(options);
//             return order;
//         }
//         catch (Exception ex)
//         {
//             Console.WriteLine(ex.Message);
//             return null;
//         }
//     }
// }
