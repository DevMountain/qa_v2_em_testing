import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

import * as employees from "./data/employees.json";

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
  //Adding a test for it to do a screenshot. Could not find the list of employees.
  //Assuming system would know that list when searching for it 
  test("Taking Screenshot", async () => {
    await page.searchFor ("Screenshot");
    //I created a Screenshots folder manually then put a file path below 
    //./__tests__/Screenshots/Screenshot
    await page.takeScreenshot("./__tests__/Screenshots/Screenshot")
    await page.searchFor ("Bill");
    await page.takeScreenshot ("./__tests__/Screenshots/Screenshot2")
    await page.searchFor("Harry Potter");
    await page.takeScreenshot ("./__tests__/Screenshots/Screenshot3")

  });
//new parameter to loop in the json file with new employees
    employees.forEach ((newEmployee) => {  
      test("Can add and delete an employee (newEmployee.name)", async () => { 
        await page.addEmployee(newEmployee);
        let employee = await page.getCurrentEmployee();
        expect(employee.name).toEqual(newEmployee.name);
        expect(employee.phone).toEqual(newEmployee.phone);
        expect(employee.email).toEqual(newEmployee.email);
        expect(employee.title).toEqual(newEmployee.title);
        //Changing "Test Employee" to newEmployee.name
        await page.deleteEmployee(newEmployee.name);
        let employeeList = await page.getEmployeeList();
        expect(employeeList).not.toContain(newEmployee.name);
      });
    
    });
    
  });

