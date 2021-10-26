import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

import * as employeesJson from "./employees.json"

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

  test("Screenshotting the 'screenshot' employees", async () => {
    // we need to search for the right group of employees
    await page.searchFor("Screenshot");
    // and then we can take the screenshot -- though I did have to make the folder "screenshots" manually first
    await page.takeScreenshot("screenshots/screenshot");
  });
  employeesJson.forEach((newEmployee) => {

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
})
});
