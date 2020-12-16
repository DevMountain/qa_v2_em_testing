import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

// The employees array was replaced by a .json file instead of having this code here.

import * as employees from "./pageObjects/employees.json";

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
  test("Take a screenshot of the screenshot employees", async () => {
    await page.searchFor("Screenshot");
    await page.takeScreenshot(`${__dirname}/../screenshot/myscreenshot`);
  });
  employees.forEach((newEmployee) => {
    test(`Can add and delete employees (newEmployee.name)`, async () => {
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
    // await page.addEmployee(newEmployee);
    // let employee = await page.getCurrentEmployee();
    // expect(employee.name).toEqual(newEmployee.name);
    // expect(employee.phone).toEqual(newEmployee.phone);
    // expect(employee.email).toEqual(newEmployee.email);
    // expect(employee.title).toEqual(newEmployee.title);
    // await page.deleteEmployee("Test Employee");
    // let employeeList = await page.getEmployeeList();
    // expect(employeeList).not.toContain("Test Employee");
    // await page.searchFor("Screenshot");
    // await page.takeScreenshot(`${__dirname}/../screenshot/myscreenshot`);
  });
});
