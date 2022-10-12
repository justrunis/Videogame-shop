namespace Videogadon.Data.Dtos.Games
{
    public record GameDto(int Id, string Name, string Description, string Platform, DateTime ReleaseDate, float Price, DateTime CreationDate);
    public record CreateGameDto(string Name, string Description, string Platform, DateTime ReleaseDate, float Price);
    public record UpdateGameDto(string Name, string Description, string Platform, float Price);

}
