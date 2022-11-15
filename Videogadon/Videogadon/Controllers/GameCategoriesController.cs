using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Videogadon.Auth.Model;
using Videogadon.Data.Dtos.GameCategories;
using Videogadon.Data.Entities;
using Videogadon.Data.Reposotories;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Text.Json;

namespace Videogadon.Controllers
{
    /* 
    /api/gameCategories GET List 200
    /api/gameCategories/{id} GET One 200
    /api/gameCategories/ POST Create 201
    /api/gameCategories/{id} PUT/PATCH Modify 200
    /api/gameCategories/{id} DELETE Remove 200/204
     */
    [ApiController]
    [Route("api/gameCategories")]
    public class GameCategoriesController : ControllerBase
    {
        private readonly IGameCategoriesRepository _gameCategoriesRepository;
        private readonly IAuthorizationService _authorizationService;
        public GameCategoriesController(IGameCategoriesRepository gameCategoriesRepository, IAuthorizationService authorizationService)
        {
            _gameCategoriesRepository = gameCategoriesRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<GameCategoryDto>> GetMany()
        {
            var gameCategories = await _gameCategoriesRepository.GetManyAsync();

            return gameCategories.Select(x => new GameCategoryDto(x.Id, x.Name, x.Description, x.CreationDate));
        }

        // api/gameCategories/{gameCategoryId}
        [HttpGet]
        [Route("{gameCategoryId}", Name = "GetGameCategory")]
        public async Task<ActionResult<GameCategoryDto>> Get(int gameCategoryId)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);

            if (gameCategory == null)
            {
                return NotFound($"Cant find a game category with id {gameCategoryId}");// 404
            }

            return new GameCategoryDto(gameCategory.Id, gameCategory.Name, gameCategory.Description, gameCategory.CreationDate);
        }

        // api/gameCategories
        [HttpPost]
        [Authorize(Roles = ShopRoles.ShopUser)]
        public async Task<ActionResult<GameCategoryDto>> Create(CreateGameCategoryDto createGameCategoryDto)
        {
            var gameCategory = new GameCategory 
                { Name = createGameCategoryDto.Name, 
                Description = createGameCategoryDto.Description, 
                CreationDate = DateTime.UtcNow, 
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                };

            await _gameCategoriesRepository.CreateAsync(gameCategory);

            // 201
            return Created("", new GameCategoryDto(gameCategory.Id, gameCategory.Name, gameCategory.Description, gameCategory.CreationDate));
        }

        // api/gameCategories
        [HttpPut]
        [Route("{gameCategoryId}")]
        [Authorize(Roles = ShopRoles.ShopUser)]
        public async Task<ActionResult<GameCategoryDto>> Update(int gameCategoryId, UpdateGameCategoryDto updateGameCategoryDto)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);

            if (gameCategory == null)
            {
                return NotFound($"Cant find a game category with id {gameCategoryId}"); // 404
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, gameCategory, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                // 404
                return Forbid();
            }

            gameCategory.Description = updateGameCategoryDto.Description;
            await _gameCategoriesRepository.UpdateAsync(gameCategory);

            return Ok(new GameCategoryDto(gameCategory.Id, gameCategory.Name, gameCategory.Description, gameCategory.CreationDate));
        }

        // api/gameCategories/{gameCategoryId}
        [HttpDelete]
        [Route("{gameCategoryId}")]
        [Authorize(Roles = ShopRoles.ShopUser)]
        public async Task<ActionResult> Remove(int gameCategoryId)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);

            if (gameCategory == null)
            {
                return NotFound($"Cant find a game category with id {gameCategoryId}"); // 404
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, gameCategory, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                // 404
                return Forbid();
            }
            await _gameCategoriesRepository.DeleteAsync(gameCategory);

            //204
            return NoContent();
        }
    }
}
