using System;
using System.ComponentModel.DataAnnotations;
using P2WebMVC.Models.JunctionModels;
using P2WebMVC.Types;

namespace P2WebMVC.Models.DomainModels;

public class Product
{

[Key]
public  Guid ProductId { get; set; } = Guid.NewGuid();
public required string ProductName { get; set; }
public required string ProductDescription { get; set; }
public required string ProductImage { get; set; }
public required decimal ProductPrice { get; set; }
public required int ProductStock { get; set; }
public required ProductCategory Category { get; set; } = ProductCategory.General;

public string? Size {get;set;}
public string? Color {get ;set;}
public string? Weight {get;set;}


public ICollection<CartProduct> ProductInCarts { get; set; } = [];   // navigation property //  collection of products in the cart
public ICollection<OrderProduct> ProductInOrders { get; set; } = []; //  collection of products in the order

public  bool IsDeleted { get; set; } = false;
public  bool IsActive { get; set; } = true;
public  DateTime CreatedAt { get; set; } = DateTime.UtcNow;
public  DateTime UpdatedAt { get; set; } = DateTime.UtcNow;



}
