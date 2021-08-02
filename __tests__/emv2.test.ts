import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

import * as employees from "./employees.json";
import { Builder, Capabilities } from "selenium-webdriver";
const fs = require("fs");
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

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
  test("Can screenshot after searching for screenshot employees", async () => {
    await page.searchFor("Screenshot");

    await page.takeScreenshot("Screenshots/employees.png");
    
  });
  employees.forEach((newEmployee) => {

    test("Can add new employees then delete them", async () => {
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
