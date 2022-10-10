namespace Videogadon.Data.Dtos.GameCategories
{
    public record GameCategoryDto(int Id, string Name, string Description, DateTime CreationDate);
    public record CreateTopicDto(string Name, string Description);
    public record UpdateTopicDto(string Description);

}
