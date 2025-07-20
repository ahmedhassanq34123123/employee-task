using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly EmployeeService _service;
    public EmployeeController(EmployeeService service)
    {
        _service = service;
    }

    [HttpGet] public IActionResult GetAll() => Ok(_service.GetAll());
    [HttpGet("{id}")] public IActionResult GetById(int id) =>
        _service.GetById(id) is Employee e ? Ok(e) : NotFound();
    [HttpPost] public IActionResult Create(Employee e) => Ok(_service.Create(e));
    [HttpPut("{id}")] public IActionResult Update(int id, Employee e) =>
        _service.Update(id, e) ? Ok() : NotFound();
    [HttpDelete("{id}")] public IActionResult Delete(int id) =>
        _service.Delete(id) ? Ok() : NotFound();
}