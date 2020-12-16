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
  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });
  test("Take a Screenshot", async () => {
    await page.searchFor("Manager");
    await page.takeScreenshot("Manager");
  });
  test(`Can add and delete an employee`, async () => {
    employees.forEach(async (newEmployee) => {
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