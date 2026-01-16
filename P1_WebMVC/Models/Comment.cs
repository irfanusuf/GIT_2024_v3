using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace P1WebMVC.Models;

public class Comment
{

    [Key]
    public Guid CommentId { get; set; } = Guid.NewGuid();   // pk 



    public Guid PostId { get; set; }     // fk 

    [ForeignKey("PostId")]
    public Post?  Post { get; set; }     // navigation properrty  // belongs to this Post 


    public Guid UserId { get; set; }   ///fk
    [ForeignKey("UserId")]
    public User ? User { get; set; }    // navigation property belongs to this user


    public required string CommentText { get; set; }
    public bool FlaggedForReport { get; set; } = false;
    public bool IsEdited { get; set; } = false;
    public DateTime CreatedOn { get; set; } = DateTime.Now; 
    public DateTime UpdatedOn { get; set; } = DateTime.Now; 

}
