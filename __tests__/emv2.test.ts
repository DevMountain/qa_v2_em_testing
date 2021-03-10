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
  test("Screenshotting the 'screenshot' employees", async () => {
    await page.searchFor("Screenshot");
    await page.takeScreenshot("screenshots/screenshot");
  });

  test("Can add and delete employee Han Soloo", async () => {
    let newEmployee = {
      "name": "Han Soloo",
      "phone": 1111111111,
      "email": "millenium@falcon.rep",
      "title": "Smuggler"
    }
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

    test("Can add and delete employee Lukee Skywalker", async () => {
      let newEmployee = {
        "name": "Lukee Skywalker",
        "phone": 2222222222,
        "email": "red5@rogue.rep",
        "title": "Jedi"
    }
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

    test("Can add and delete employee Thrawnn", async () => {
      let newEmployee = {
        "name": "Thrawnn",
        "phone": 3333333333,
        "email": "gathrawn@admiralty.emp",
        "title": "Best Villain"
    }
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
    
    test("Can add and delete an employee R2-D22", async () => {
      let newEmployee = {
        "name": "R2-D22",
        "phone": 4444444444,
        "email": "pottymouth@astromech.rep",
        "title": "Crotchety Old Droid"
    }
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
