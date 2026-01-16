using System;
using Microsoft.EntityFrameworkCore;
using P1WebMVC.Models;


namespace P1WebMVC.Data;

public class SqlDbContext : DbContext
{

    public SqlDbContext(DbContextOptions<SqlDbContext> options) : base(options) { }

    // entities

    public DbSet<User> Users { get; set; }

    public DbSet<Post> Posts { get; set; }

    public DbSet<Comment> Comments { get; set; }


    // fluent api so that we will have fine control on relationships  
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>()
        .HasOne(p => p.User)    // post ka ek user hai jis se woh belong kerta hai
        .WithMany(u => u.Posts)  // user kay bahiut sarey posts hai 
        .HasForeignKey(p => p.UserId)   // post ke ander userid forign key hai 
        .OnDelete(DeleteBehavior.Cascade);   // user delete kerdiya /toh sarein ppost delete hojayegye 



        modelBuilder.Entity<Comment>()
        .HasOne(c => c.Post)     // comment belong kerta hai ek post se
        .WithMany(p => p.Comments)   // us post per bahut sarein comments hai 
        .HasForeignKey(c => c.PostId)  // comment kay ander post id ek fk hai
        .OnDelete(DeleteBehavior.Restrict);  



        modelBuilder.Entity<Comment>()
        .HasOne(c => c.User)     // comment belong kerta hai ek user se
        .WithMany(u => u.Comments)   // us user key bahut sarein comments hai 
        .HasForeignKey(c => c.UserId)  // comment kay ander user id ek fk hai
        .OnDelete(DeleteBehavior.Restrict);  



        // error // bug //  

        // correct way is to create junction model 

        // modelBuilder.Entity<User>()
        // .HasMany(u => u.LikesGiven)    
        // .WithMany(p => p.Likes);


    }

    


}
