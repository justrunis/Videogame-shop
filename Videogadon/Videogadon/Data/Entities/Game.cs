using System.ComponentModel.DataAnnotations;
using Videogadon.Auth.Model;

namespace Videogadon.Data.Entities
{
    public class Game : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Platform  { get; set; }
        public DateTime ReleaseDate { get; set; }
        public float Price { get; set; }
        public DateTime CreationDate { get; set; }
        public int GameCategoryId { get; set; }

        [Required]
        public int UserId { get; set; }
        public ShopRestUser User { get; set; }

        public GameCategory GameCategory { get; set; }

    }
}
