using Videogadon.Data;
using Videogadon.Data.Reposotories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<VideogadonDbContext>();

builder.Services.AddTransient<IGameCategoriesRepository, GameCategoriesRepository>();
builder.Services.AddTransient<IGamesRepository, GamesRepository>();
builder.Services.AddTransient<ICommentsRepository, CommentsRepository>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();
