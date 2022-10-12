﻿using Microsoft.EntityFrameworkCore;
using Videogadon.Data.Entities;

namespace Videogadon.Data.Reposotories
{
    public interface ICommentsRepository
    {
        Task<Comment?> GetAsync(int commentId);
        Task<IReadOnlyList<Comment>> GetManyAsync();
        Task CreateAsync(Comment comment);
        Task UpdateAsync(Comment comment);
        Task DeleteAsync(Comment comment);

    }

    public class CommentsRepository : ICommentsRepository
    {
        private readonly VideogadonDbContext _videogadonDbContext;
        public CommentsRepository(VideogadonDbContext videogadonDbContext)
        {
            _videogadonDbContext = videogadonDbContext;
        }

        public async Task<Comment?> GetAsync(int commentId)
        {
            return await _videogadonDbContext.Comments.FirstOrDefaultAsync(x => x.Id == commentId);
        }

        public async Task<IReadOnlyList<Comment>> GetManyAsync()
        {
            return await _videogadonDbContext.Comments.ToListAsync();
        }

        public async Task CreateAsync(Comment comment)
        {
            _videogadonDbContext.Comments.Add(comment);
            await _videogadonDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Comment comment)
        {
            _videogadonDbContext.Comments.Update(comment);
            await _videogadonDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Comment comment)
        {
            _videogadonDbContext.Comments.Remove(comment);
            await _videogadonDbContext.SaveChangesAsync();
        }
    }
}