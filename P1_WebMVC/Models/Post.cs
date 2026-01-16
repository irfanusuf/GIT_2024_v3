using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace P1WebMVC.Models;

public class Post
{

    public Guid PostId { get; set; } = Guid.NewGuid();   // pk 
    public Guid? UserId { get; set; }  // Fk

    [ForeignKey("UserId")]
    public User? User { get; set; }    // navigation property 

    public string? PostpicURL { get; set; }
    public string? PostVideoURL { get; set; }
    public required string PostCaption { get; set; }
    public ICollection<User> Likes { get; set; } = [];
    public ICollection<Comment> Comments { get; set; } = [];  
    public DateTime CreatedOn { get; set; } = DateTime.Now; 
    public DateTime UpdatedOn { get; set; } = DateTime.Now; 


}
