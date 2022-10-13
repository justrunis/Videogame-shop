﻿namespace Videogadon.Data.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }
        public int GameCategoryId { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}
