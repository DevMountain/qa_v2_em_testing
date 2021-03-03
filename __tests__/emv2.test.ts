import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";
import * as Employees from '../employees.json';

describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });
test("Can add screenshot", async () => {
    for(let i = 0; i < Employees.length; i++) {
      if(Employees[i]["title"] == "Screenshot"){
        await page.addEmployee(Employees[i]);
        await page.getCurrentEmployee();
        await page.takeScreenshot("screenshots/screenshots");
      }}
    });
  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });
    test("Can add and delete employees from JSON file", async () => {
      for(let i = 0; i < Employees.length; i++) {
        let newEmployee = Employees[i];
        await page.addEmployee(newEmployee);
        let employee = await page.getCurrentEmployee();
        expect(employee.name).toEqual(newEmployee.name);
        expect(employee.phone).toEqual(newEmployee.phone);
        expect(employee.email).toEqual(newEmployee.email);
        expect(employee.title).toEqual(newEmployee.title);
        await page.deleteEmployee((Employees[i].name).toString());
        let employeeList = await page.getEmployeeList();
        expect(employeeList).not.toContain((Employees[i].name).toString());
      }
    })
});
