using Videogadon.Data;
using Videogadon.Data.Reposotories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<VideogadonDbContext>();
builder.Services.AddTransient<IGameCategoriesRepository, GameCategoriesRepository>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();
