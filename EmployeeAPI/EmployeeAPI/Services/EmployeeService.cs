public class EmployeeService
{
    private readonly List<Employee> _employees = new();
    private int _nextId = 1;

    public List<Employee> GetAll() => _employees;
    public Employee? GetById(int id) => _employees.FirstOrDefault(e => e.Id == id);
    public Employee Create(Employee emp)
    {
        emp.Id = _nextId++;
        _employees.Add(emp);
        return emp;
    }
    public bool Update(int id, Employee updated)
    {
        var emp = GetById(id);
        if (emp == null) return false;
        emp.FirstName = updated.FirstName;
        emp.LastName = updated.LastName;
        emp.Email = updated.Email;
        emp.Position = updated.Position;
        return true;
    }
    public bool Delete(int id)
    {
        var emp = GetById(id);
        if (emp == null) return false;
        _employees.Remove(emp);
        return true;
    }
}