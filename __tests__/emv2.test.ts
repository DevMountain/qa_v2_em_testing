import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

import * as employees from "./employees.json";

describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });

  // test search
  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });

  // test add and delete employee
  employees.forEach((employee) => {
    test("Can add and delete an employee", async () => {
      await page.addEmployee(employee);
      let newEmployee = await page.getCurrentEmployee();
      expect(newEmployee.name).toEqual(employee.name);
      expect(newEmployee.phone).toEqual(employee.phone);
      expect(newEmployee.email).toEqual(employee.email);
      expect(newEmployee.title).toEqual(employee.title);
      await page.deleteEmployee(employee.name);
      let employeeList = await page.getEmployeeList();
      expect(employeeList).not.toContain(employee.name);
    });
  });

  // test to search and take a screenshot of employees with a specific title
  test("Screenshot employees with 'screenshot' title", async () => {
    await page.searchFor("Screenshot");
    await page.takeScreenshot("./screenshots/employees");
  });
});
