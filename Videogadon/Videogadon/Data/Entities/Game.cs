namespace Videogadon.Data.Entities
{
    public class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Platform  { get; set; }
        public DateTime ReleaseDate { get; set; }
        public float Price { get; set; }
        public DateTime CreationDate { get; set; }
        public int GameCategoryId { get; set; }

        public GameCategory GameCategory { get; set; }

    }
}
