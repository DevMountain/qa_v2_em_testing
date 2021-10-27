import { findSafariDriver } from "selenium-webdriver/safari";
import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

import * as employees from "./dataAssets/employees.json";

describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "firefox" });
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
  test("Screenshotting screenshot title employees", async () => {
  await page.searchFor("Screenshot")
  await page.takeScreenshot(`${__dirname}/../screenshots/screenshot.png`);
  });
  test("Screenshotting student title employees", async () => {
  await page.searchFor("Student")
  await page.takeScreenshot(`${__dirname}/../screenshots/studentscreenshot.png`);
  });
  test("Screenshotting instructor title employees", async () => {
  await page.searchFor("instructor")
  await page.takeScreenshot(`${__dirname}/../screenshots/instructorscreenshot.png`);
  });
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
      expect(employeeList).not.toContain("newEmployee.name");
    });
  });
 });
