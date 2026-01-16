using System;
using P2WebMVC.Models.DomainModels;

namespace P2WebMVC.Models.ViewModels;

public class ProductView
{


public ICollection<Product> Products {get;set;} =[]; 

public Product? Product {get;set;}



}
