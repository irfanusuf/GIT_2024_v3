using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace P2WebMVC.Models.DomainModels;

public class Address
{
    [Key]
    public Guid AddressId { get; set; } = Guid.NewGuid(); //pk
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Street { get; set; }
    public required string City { get; set; }
    public required string District { get; set; }
    public required string State { get; set; }
    public required string Country { get; set; }
    public required string Pincode { get; set; }
    public required string Phone { get; set; }
    public required string Landmark { get; set; }

    
    public required Guid UserId { get; set; } // Fk 

    [ForeignKey("UserId")]
    public User? Buyer { get; set; } // Navigation property


    public ICollection<Order> Orders { get; set; } = [];// naviagtion property
}
