using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Videogadon.Auth;
using Videogadon.Auth.Model;
using Videogadon.Data;
using Videogadon.Data.Reposotories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddIdentity<ShopRestUser, IdentityRole>()
    .AddEntityFrameworkStores<VideogadonDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddDbContext<VideogadonDbContext>();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters.ValidAudience = builder.Configuration["JWT:ValidAudience"]; // for who token is
        options.TokenValidationParameters.ValidIssuer = builder.Configuration["JWT:ValidIssuer"]; // who gives token
        options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])); // hashing
    });


builder.Services.AddTransient<IGameCategoriesRepository, GameCategoriesRepository>();
builder.Services.AddTransient<IGamesRepository, GamesRepository>();
builder.Services.AddTransient<ICommentsRepository, CommentsRepository>();

builder.Services.AddTransient<IJwtTokenService, JwtTokenService>();

builder.Services.AddScoped<AuthDbSeeder>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.UseAuthentication();
app.UseAuthorization();

var dbSeeder = app.Services.CreateScope().ServiceProvider.GetRequiredService<AuthDbSeeder>();
await dbSeeder.SeedAsync();

app.Run();
