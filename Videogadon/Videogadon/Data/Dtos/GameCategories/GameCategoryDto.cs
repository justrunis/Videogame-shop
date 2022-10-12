namespace Videogadon.Data.Dtos.GameCategories
{
    public record GameCategoryDto(int Id, string Name, string Description, DateTime CreationDate);
    public record CreateGameCategoryDto(string Name, string Description);
    public record UpdateGameCategoryDto(string Description);
}
