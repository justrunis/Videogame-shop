using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;
using Videogadon.Auth.Model;
using Videogadon.Data.Dtos.GameCategories;
using Videogadon.Data.Dtos.Games;
using Videogadon.Data.Entities;
using Videogadon.Data.Reposotories;
using Microsoft.IdentityModel.JsonWebTokens;

namespace Videogadon.Controllers
{
    /*
    api/gameCategories/{gameCategoryId}/games GET List 200
    api/gameCategories/{gameCategoryId}/games/{gameId} GET One 200
    api/gameCategories/{gameCategoryId}/games POST Create 201
    api/gameCategories/{gameCategoryId}/games/{gameId} PUT/PATCH Modify 200
    api/gameCategories/{gameCategoryId}/games/{gameId} DELETE Remove 200/204
     */

    [ApiController]
    [Route("api/gameCategories/{gameCategoryId}/games")]
    public class GamesController : ControllerBase
    {
        private readonly IGameCategoriesRepository _gameCategoriesRepository;
        private readonly IGamesRepository _gamesRepository;
        private readonly IAuthorizationService _authorizationService;
        public GamesController(IGamesRepository gamesRepository, IGameCategoriesRepository gameCategoriesRepository, IAuthorizationService authorizationService)
        {
            _gamesRepository = gamesRepository;
            _gameCategoriesRepository = gameCategoriesRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<GameDto>> GetMany(int gameCategoryId)
        {
            var gameCategories = await _gamesRepository.GetAsync(gameCategoryId);
            return gameCategories.Select(x => new GameDto(x.Id, x.Name, x.Description, x.Platform, x.ReleaseDate, x.Price, x.CreationDate, x.GameCategoryId));
        }

        // api/gameCategories/{gameCategoryId}/games/{gameId}
        [HttpGet]
        [Route("{gameId}")]
        public async Task<ActionResult<GameDto>> Get(int gameCategoryId, int gameId)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);
            if (gameCategory == null)
            {
                //404
                return NotFound($"Couldn't find a game category with id of {gameCategoryId}");
            }

            var game = await _gamesRepository.GetAsync(gameCategoryId, gameId);
            if (game == null) return NotFound($"Couldn't find a game with id of {gameId}"); //404

            return new GameDto(game.Id, game.Name, game.Description, game.Platform, game.ReleaseDate, game.Price, game.CreationDate, game.GameCategoryId);
        }

        // api/gameCategories/{gameCategoryId}/games
        [HttpPost]
        [Authorize(Roles = ShopRoles.ShopUser)]
        public async Task<ActionResult<GameDto>> Create(int gameCategoryId, CreateGameDto createGameDto)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);
            if (gameCategory == null)
            {
                //404
                return NotFound($"Couldn't find a game category with id of {gameCategoryId}");
            }

            var game = new Game
            {
                Name = createGameDto.Name,
                Description = createGameDto.Description,
                Platform = createGameDto.Platform,
                ReleaseDate = createGameDto.ReleaseDate,
                Price = createGameDto.Price,
                CreationDate = DateTime.Now,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };
            game.GameCategoryId = gameCategoryId;
            await _gamesRepository.CreateAsync(game);

            //201
            return Created($"api/gameCategories/{gameCategoryId}/games/{game.Id}", new GameDto(game.Id, game.Name, game.Description, game.Platform, game.ReleaseDate, game.Price, game.CreationDate, game.GameCategoryId));
        }

        // api/gameCategories/{gameCategoryId}/games/{gameId}
        [HttpPut]
        [Route("{gameId}")]
        [Authorize(Roles = ShopRoles.ShopUser)]
        public async Task<ActionResult<GameDto>> Update(int gameCategoryId, int gameId, UpdateGameDto gameDto)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);
            if (gameCategory == null)
            {
                return NotFound($"Couldn't find a game category with id of {gameCategoryId}");
            }
            var game = await _gamesRepository.GetAsync(gameCategoryId, gameId);

            if (game == null)
            {
                return NotFound($"Couldn't find a game with id of {gameId}");
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, game, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                // 404
                return Forbid();
            }

            game.Name = gameDto.Name;
            game.Description = gameDto.Description;
            game.Platform = gameDto.Platform;
            game.Price = gameDto.Price;
            await _gamesRepository.UpdateAsync(game);

            return Ok(new GameDto(game.Id, game.Name, game.Description, game.Platform, game.ReleaseDate, game.Price, game.CreationDate, game.GameCategoryId));

        }

        // api/gameCategories/{gameCategoryId}/games/{gameId}
        [HttpDelete]
        [Route("{gameId}")]
        [Authorize(Roles = ShopRoles.ShopUser)]
        public async Task<ActionResult> Remove(int gameCategoryId, int gameId)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);
            if (gameCategory == null)
            {
                return NotFound($"Couldn't find a game category with id of {gameCategoryId}");
            }

            var game = await _gamesRepository.GetAsync(gameCategoryId, gameId);
            if (game == null)
            {
                return NotFound($"Couldn't find a game with id of {gameId}");
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, game, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                // 404
                return Forbid();
            }

            await _gamesRepository.DeleteAsync(game);

            //204
            return NoContent();
        }
    }
}
