using System;

namespace P1WebMVC.Models.ViewModels;

public class ExploreViewModel
{

    public ICollection<Post> Posts { get; set; } = [];

    public ICollection<Post> Reels { get; set; } = [];

    public ICollection<User> SuggestedUsers { get; set; } = [];

    public User? LoggedInUser { get; set; }

    public User? ProfileUser { get; set; }


}
