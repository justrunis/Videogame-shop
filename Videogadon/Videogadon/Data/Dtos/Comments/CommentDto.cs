namespace Videogadon.Data.Dtos.Comments
{
    public record CommentDto(int Id, string Content, DateTime CreationDate, int GameId);
    public record CreateCommentDto(string Content);
    public record UpdateCommentDto(string Content);
}