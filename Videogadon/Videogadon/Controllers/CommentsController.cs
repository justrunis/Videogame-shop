using Microsoft.AspNetCore.Mvc;
using Videogadon.Data.Dtos.Comments;
using Videogadon.Data.Dtos.GameCategories;
using Videogadon.Data.Dtos.Games;
using Videogadon.Data.Entities;
using Videogadon.Data.Reposotories;

namespace Videogadon.Controllers
{

    /*
        api/gameCategories/{gameCategoryId}/games/{gameId}/comments GET List 200
        api/gameCategories/{gameCategoryId}/games/{gameId}/comments/{commentId} GET One 200
        api/gameCategories/{gameCategoryId}/games/{gameId}/comments POST Create 201
        api/gameCategories/{gameCategoryId}/games/{gameId}/comments{commentId} PUT/PATCH Modify 200
        api/gameCategories/{gameCategoryId}/games/{gameId}/comments{commentId} DELETE Remove 200/204
    */

    [ApiController]
    [Route("api/gameCategories/{gameCategoryId}/games/{gameId}/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly IGameCategoriesRepository _gameCategoriesRepository;
        private readonly IGamesRepository _gamesRepository;
        private readonly ICommentsRepository _commentsRepository;

        public CommentsController(IGameCategoriesRepository gameCategoriesRepository, IGamesRepository gamesRepository, ICommentsRepository commentsRepository)
        {
            _gameCategoriesRepository = gameCategoriesRepository;
            _gamesRepository = gamesRepository;
            _commentsRepository = commentsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<CommentDto>> GetMany(int gameId)
        {
            var comments = await _commentsRepository.GetAsync(gameId);
            return comments.Select(x => new CommentDto(x.Id, x.Content, x.CreationDate, x.GameId));
        }

        // api/gameCategories/{gameCategoryId}/games/{gameId}/comments/{commentId}
        [HttpGet]
        [Route("{commentId}")]
        public async Task<ActionResult<CommentDto>> Get(int gameCategoryId, int gameId, int commentId)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);
            if (gameCategory == null) return NotFound($"Couldn't find a game category with id of {gameCategoryId}"); //404

            var game = await _gamesRepository.GetAsync(gameCategoryId, gameId);
            if (game == null) return NotFound($"Couldn't find a game with id of {gameId}"); //404

            var comment = await _commentsRepository.GetAsync(gameId, commentId);
            if (comment == null) return NotFound($"Couldn't find a comment with id of {commentId}"); //404

            return new CommentDto(comment.Id, comment.Content, comment.CreationDate, comment.GameId);
        }

        // api/gameCategories/{gameCategoryId}/games/{gameId}/comments
        [HttpPost]
        public async Task<ActionResult<CommentDto>> Create(int gameCategoryId, int gameId, CreateCommentDto createCommentDto)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);
            if (gameCategory == null)
            {
                return NotFound($"Couldn't find a game category with id of {gameCategoryId}"); //404
            }

            var game = await _gamesRepository.GetAsync(gameId);
            if (game == null)
            {
                return NotFound($"Couldn't find a game with id of {gameId}"); //404
            }

            var comment = new Comment
            {
                Content = createCommentDto.Content,
                CreationDate = DateTime.Now
            };
            comment.GameId = gameId;
            await _commentsRepository.CreateAsync(comment);

            //201
            return Created($"api/gameCategories/{gameCategoryId}/games/{gameId}/comments/{comment.Id}", new CommentDto(comment.Id, comment.Content, comment.CreationDate, comment.GameId));
        }

        // api/gameCategories/{gameCategoryId}/games/{gameId}/comments/{commentId}
        [HttpPut]
        [Route("{commentId}")]
        public async Task<ActionResult<CommentDto>> Update(int gameCategoryId, int gameId, int commentId, UpdateCommentDto commentDto)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);
            if (gameCategory == null)
            {
                return NotFound($"Couldn't find a game category with id of {gameCategoryId}"); //404
            }

            var game = await _gamesRepository.GetAsync(gameCategoryId, gameId);
            if (game == null)
            {
                return NotFound($"Couldn't find a game with id of {gameId}"); //404
            }

            var comment = await _commentsRepository.GetAsync(gameId, commentId);
            if (comment == null)
            {
                return NotFound($"Couldn't find a comment with id of {commentId}"); //404
            }

            comment.Content = commentDto.Content;
            await _commentsRepository.UpdateAsync(comment);

            return Ok(new CommentDto(comment.Id, comment.Content, comment.CreationDate, comment.GameId)); //200
        }

        // api/gameCategories/{gameCategoryId}/games/{gameId}/comments/{commentId}
        [HttpDelete]
        [Route("{commentId}")]
        public async Task<ActionResult> Remove(int gameCategoryId,int gameId, int commentId)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);
            if (gameCategory == null)
            {
                return NotFound($"Couldn't find a game category with id of {gameCategoryId}"); //404
            }

            var game = await _gamesRepository.GetAsync(gameCategoryId, gameId);
            if (game == null)
            {
                return NotFound($"Couldn't find a game with id of {gameId}"); //404
            }

            var comment = await _commentsRepository.GetAsync( gameId, commentId);
            if (comment == null)
            {
                return NotFound($"Couldn't find a comment with id of {commentId}"); //404
            }
            await _commentsRepository.DeleteAsync(comment);

            return NoContent();// 204
        }
    }
}
