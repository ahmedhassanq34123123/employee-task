var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<EmployeeService>();

var AllowSpecificOrigins = "AllowSpecificOrigins";

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();          
    app.UseSwaggerUI();        
}
app.UseCors(AllowSpecificOrigins); 

app.MapControllers();
app.Run();