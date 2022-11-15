using System.ComponentModel.DataAnnotations;
using Videogadon.Auth.Model;

namespace Videogadon.Data.Entities
{
    public class GameCategory : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }

        [Required]
        public string UserId { get; set; }
        public ShopRestUser User { get; set; }
    }
}