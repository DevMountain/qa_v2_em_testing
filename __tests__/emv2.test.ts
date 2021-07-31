import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

import * as employees from "./employees.json"

describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });
  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });

  //
  test("Screenshotting the 'screenshot' employees", async () => {
    await page.searchFor("Screenshot");
    await page.takeScreenshot("screenshots/screenshot");
  });

  employees.forEach((newEmployee) => {

  
    test("Can add and delete an employee (newEmployee.name)", async () => {
      let newEmployee = {
        name: "Test Employee",
        phone: 1234567890,
        email: "test@email.com",
        title: "test person",
      };
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
