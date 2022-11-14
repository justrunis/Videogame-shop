using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Videogadon.Auth.Model;
using Videogadon.Data.Entities;

namespace Videogadon.Data
{
    public class VideogadonDbContext : IdentityDbContext<ShopRestUser>
    {
        public DbSet<GameCategory> GameCategories { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=VideogadonDb");
        }

    }
}
