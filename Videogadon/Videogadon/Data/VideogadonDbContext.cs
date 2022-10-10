using Microsoft.EntityFrameworkCore;
using Videogadon.Data.Entities;

namespace Videogadon.Data
{
    public class VideogadonDbContext : DbContext
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
