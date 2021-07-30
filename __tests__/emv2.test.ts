import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

import * as employees from "../employees.json"

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

  test("Screen for emplloyee", async () => {
    await page.searchFor('Screenshot');
    await page.takeScreenshot('screenshot/screenshot');
  });



  //this test is failing and needs to be changed and divided into two tests, 1st to add and another one for deleteing
  test("Can add new emplloyee", async () => {
    // await (await page.driver.findElement(page.addButton)).click();
    let newEmployee = {
      name: "Test Employee",
      phone: 1234567890,
      email: "test@email.com",
      title: "test person",
    };
    await page.addEmployee(newEmployee);
    let employee = await page.getCurrentEmployee();
    await page.getElement(page.saveButton);
    expect(employee.name).toEqual(newEmployee.name);
    expect(employee.phone).toEqual(newEmployee.phone);
    expect(employee.email).toEqual(newEmployee.email);
    expect(employee.title).toEqual(newEmployee.title);
    
  });
  test("delete employee", async () => {
    await page.deleteEmployee("Test Employee");
    let employeeList = await page.getEmployeeList();
    expect(employeeList).not.toContain("Test Employee");
  })
});
