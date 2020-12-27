import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";
import * as testData from "./testData.json";

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
    await page.searchFor("Screenshot");
    let resultList = await page.getEmployeeList();
    // Take a screenshot of the search results and save it as a .png file.
    let savePath = "./screenshot/shot";
    page.takeScreenshot(savePath);
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });
  test("Can add and delete an employee", async () => {
    // Create and add a new employee using data from .json file. 
    for( let i = 0; i < testData.length; i++ ) {
      let newEmployee = {
        name: testData[i].name,
        phone: testData[i].phone,
        email: testData[i].email,
        title: testData[i].title,
      };
    await page.addEmployee(newEmployee);
    let employee = await page.getCurrentEmployee();
    expect(employee.name).toEqual(newEmployee.name);
    expect(employee.phone).toEqual(newEmployee.phone);
    expect(employee.email).toEqual(newEmployee.email);
    expect(employee.title).toEqual(newEmployee.title);
    await page.deleteEmployee(testData[i].name);
    let employeeList = await page.getEmployeeList();
    expect(employeeList).not.toContain(testData[i].name);
    };
  });
});
