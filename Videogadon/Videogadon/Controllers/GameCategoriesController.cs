using Microsoft.AspNetCore.Mvc;
using Videogadon.Data.Dtos.GameCategories;
using Videogadon.Data.Entities;
using Videogadon.Data.Reposotories;

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
        public GameCategoriesController(IGameCategoriesRepository gameCategoriesRepository)
        {
            _gameCategoriesRepository = gameCategoriesRepository;
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

            // 404
            if (gameCategory == null)
            {
                return NotFound();
            }

            return new GameCategoryDto(gameCategory.Id, gameCategory.Name, gameCategory.Description, gameCategory.CreationDate);
        }

        // api/gameCategories
        [HttpPost]
        public async Task<ActionResult<GameCategoryDto>> Create(CreateTopicDto createGameCategoryDto)
        {
            var gameCategory = new GameCategory 
                { Name = createGameCategoryDto.Name, Description = createGameCategoryDto.Description, CreationDate = DateTime.UtcNow };

            await _gameCategoriesRepository.CreateAsync(gameCategory);

            // 201
            return Created("", new GameCategoryDto(gameCategory.Id, gameCategory.Name, gameCategory.Description, gameCategory.CreationDate));
        }

        // api/gameCategories
        [HttpPut]
        [Route("{gameCategoryId}")]
        public async Task<ActionResult<GameCategoryDto>> Update(int gameCategoryId, UpdateTopicDto updateGameCategoryDto)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);

            // 404
            if (gameCategory == null)
            {
                return NotFound();
            }
            gameCategory.Description = updateGameCategoryDto.Description;
            await _gameCategoriesRepository.UpdateAsync(gameCategory);

            return Ok(new GameCategoryDto(gameCategory.Id, gameCategory.Name, gameCategory.Description, gameCategory.CreationDate));
        }

        // api/gameCategories/{gameCategoryId}
        [HttpDelete]
        [Route("{gameCategoryId}")]
        public async Task<ActionResult> Remove(int gameCategoryId)
        {
            var gameCategory = await _gameCategoriesRepository.GetAsync(gameCategoryId);

            // 404
            if (gameCategory == null)
            {
                return NotFound();
            }
            await _gameCategoriesRepository.DeleteAsync(gameCategory);

            //204
            return NoContent();
        }
    }
}
