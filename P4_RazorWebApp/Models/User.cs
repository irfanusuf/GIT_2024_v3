using System;

namespace p4RazorWebApp.Models;

public class User
{

    public  string ? Username { get; set; }
    public required string  Email { get; set; }
    public required string  Password { get; set; }


}
