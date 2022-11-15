using System.ComponentModel.DataAnnotations;
using Videogadon.Auth.Model;

namespace Videogadon.Data.Entities
{
    public class Comment : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }
        public int GameId { get; set; }

        [Required]
        public string UserId { get; set; }
        public ShopRestUser User { get; set; }

        public Game Game { get; set; }
    }
}
