using System.Xml.Linq;
using System;
using System.Threading.Tasks;
using Videogadon.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Videogadon.Data.Reposotories
{
    public interface IGamesRepository
    {
        Task<Game?> GetAsync(int gameCategoryId, int gameId);
        Task<List<Game>> GetAsync(int gameCategoryId);
        Task<IReadOnlyList<Game>> GetManyAsync();
        Task CreateAsync(Game game);
        Task UpdateAsync(Game game);
        Task DeleteAsync(Game game);

    }

    public class GamesRepository : IGamesRepository
    {
        private readonly VideogadonDbContext _videogadonDbContext;

        public GamesRepository(VideogadonDbContext videogadonDbContext)
        {
            _videogadonDbContext = videogadonDbContext;
        }

        public async Task<Game?> GetAsync(int gameCategoryId, int gameId)
        {
            return await _videogadonDbContext.Games.FirstOrDefaultAsync(x => x.GameCategoryId == gameCategoryId && x.Id == gameId);
        }

        public async Task<List<Game>> GetAsync(int gameCategoryId)
        {
            return await _videogadonDbContext.Games.Where(x => x.GameCategoryId == gameCategoryId).ToListAsync();
        }

        public async Task<IReadOnlyList<Game>> GetManyAsync()
        {
            //return await _videogadonDbContext.Games.Where(x => x.GameCategoryId == gameCategoryId).ToListAsync();
            return await _videogadonDbContext.Games.ToListAsync();
        }

        public async Task CreateAsync(Game game)
        {
            _videogadonDbContext.Games.Add(game);
            await _videogadonDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Game game)
        {
            _videogadonDbContext.Games.Update(game);
            await _videogadonDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Game game)
        {
            _videogadonDbContext.Games.Remove(game);
            await _videogadonDbContext.SaveChangesAsync();
        }
    }
}
