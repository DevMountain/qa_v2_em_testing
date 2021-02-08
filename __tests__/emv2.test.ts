import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";
import * as employees from "./data/employees.json";


describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });

  // your code below
  // find employees with "Screenshot"
  // then take screenshot
test("Screenshots employees with 'Secreenshot' as Title", async () => {
    await page.searchFor("Screenshot");
    await page.takeScreenshot("screenshots/screenshot");
  });


  /** 
   * Important note: As of 2-8-2021 Empoyee Manager is 
   * giving error: Please finish updating your current new employee before adding another.
   * unable to run below code
   * 
   */
  employees.forEach((newEmployee) => {
   
    test(`Can add and delete an employee (newEmployee.name)`, async () => {
      await page.addEmployee(newEmployee);
      let employee = await page.getCurrentEmployee();
      expect(employee.name).toEqual(newEmployee.name);
      expect(employee.phone).toEqual(newEmployee.phone);
      expect(employee.email).toEqual(newEmployee.email);
      expect(employee.title).toEqual(newEmployee.title);
      
      await page.deleteEmployee(newEmployee.name);
      let employeeList = await page.getEmployeeList();
    
      expect(employeeList).not.toContain(newEmployee.name);
    });
  });
});
