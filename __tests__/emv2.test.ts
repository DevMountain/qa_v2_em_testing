import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";
import * as employeeData from "./dataSets/employeeData.json"
import { findSafariDriver } from "selenium-webdriver/safari";
import { Driver } from "selenium-webdriver/chrome";

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
  test("Screenshot", async () => {
    await page.searchFor("Screenshot");
    let d = new Date(Date.now());
    await page.takeScreenshot(`${__dirname}/screenshots/` + d.toISOString());
  });
  test("Can add and delete an employee", async () => {

    for (let i=0; i<employeeData.length; i++){
      await page.addEmployee(employeeData[i]);
      let employee = await page.getCurrentEmployee();
      expect(employee.name).toEqual(employeeData[i].name);
      expect(employee.phone).toEqual(employeeData[i].phone);
      expect(employee.email).toEqual(employeeData[i].email);
      expect(employee.title).toEqual(employeeData[i].title);

      await page.deleteEmployee(employeeData[i].name);
      let employeeList = await page.getEmployeeList();
      expect(employeeList).not.toContain(employeeData[i].name);
    }

  });
});
