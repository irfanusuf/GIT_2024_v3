using System;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace P1WebMVC.Models;

public class User
{

    [Key]
    public Guid UserId { get; set; } = Guid.NewGuid();
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string? ProfilePic { get; set; }
    public string? Bio { get; set; }
    public ICollection<Post> Posts { get; set; } = [];
    public ICollection<Comment> Comments { get; set; } = [];
    public ICollection<Post> LikesGiven { get; set; } = [];
    public DateTime CreatedOn { get; set; } = DateTime.Now;
    public DateTime UpdatedOn { get; set; } = DateTime.Now;
        
}
