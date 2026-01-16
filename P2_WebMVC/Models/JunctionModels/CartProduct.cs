using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using P2WebMVC.Models.DomainModels;

namespace P2WebMVC.Models.JunctionModels;

public class CartProduct
{
    [Key]
    public  Guid CartProductId { get; set; } = Guid.NewGuid();   // pk 


    public required Guid CartId { get; set; } // Fk
    [ForeignKey("CartId")]
    public Cart? Cart { get; set; } // navigation property //  belonging to a cart




    public required Guid ProductId { get; set; } // Fk
    [ForeignKey("ProductId")]
    public Product? Product { get; set; } // navigation property //  belonging to a product



    public required int Quantity { get; set; } = 1;

    public string? Size { get; set; }
    public string? Color { get; set; }
    public string? Weight { get; set; }


    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedOn { get; set; } = DateTime.UtcNow;

}
