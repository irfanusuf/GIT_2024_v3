using System;
using P2WebMVC.Models.DomainModels;

namespace P2WebMVC.Models.ViewModels;

public class OrderView
{



    public Order? Order { get; set; }

    public ICollection<Order> Orders { get; set; } = [];


}
