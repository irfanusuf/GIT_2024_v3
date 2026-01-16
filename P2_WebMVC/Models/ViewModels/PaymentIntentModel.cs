using System;

namespace P2WebMVC.Models.ViewModels;

public class PaymentIntentModel
{

            public int Amount { get; set; }
            public string? Currency { get; set; }
            public Guid OrderId { get; set; }

}
