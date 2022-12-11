using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using Videogadon.Auth.Model;
using Videogadon.Data.Entities;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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
            //optionsBuilder.UseSqlServer("Data Source=tcp:videogadondbserver.database.windows.net,1433;Initial Catalog=Videogadon_db;User Id=justrunis@videogadondbserver;Password=Britva14");
        }

    }
}
