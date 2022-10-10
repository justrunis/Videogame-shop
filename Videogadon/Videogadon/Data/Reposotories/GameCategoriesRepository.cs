using System.Xml.Linq;
using System;
using System.Threading.Tasks;
using Videogadon.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Videogadon.Data.Reposotories
{
    public interface IGameCategoriesRepository
    {
        Task<GameCategory?> GetAsync(int gameCategoryId);
        Task<IReadOnlyList<GameCategory>> GetManyAsync();
        Task CreateAsync(GameCategory gameCategory);
        Task UpdateAsync(GameCategory gameCategory);
        Task DeleteAsync(GameCategory gameCategory);

    }

    public class GameCategoriesRepository : IGameCategoriesRepository
    {

        private readonly VideogadonDbContext _videogadonDbContext;
        public GameCategoriesRepository(VideogadonDbContext videogadonDbContext)
        {
            _videogadonDbContext = videogadonDbContext;
        }

        public async Task<GameCategory?> GetAsync(int gameCategoryId)
        {
            return await _videogadonDbContext.GameCategories.FirstOrDefaultAsync(x => x.Id == gameCategoryId);
        }

        public async Task<IReadOnlyList<GameCategory>> GetManyAsync()
        {
            return await _videogadonDbContext.GameCategories.ToListAsync();
        }

        public async Task CreateAsync(GameCategory gameCategory)
        {
            _videogadonDbContext.GameCategories.Add(gameCategory);
            await _videogadonDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(GameCategory gameCategory)
        {
            _videogadonDbContext.GameCategories.Update(gameCategory);
            await _videogadonDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(GameCategory gameCategory)
        {
            _videogadonDbContext.GameCategories.Remove(gameCategory);
            await _videogadonDbContext.SaveChangesAsync();
        }
    }
}
