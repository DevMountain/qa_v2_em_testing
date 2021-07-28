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
  test("searching with the title 'Screenshot' ", async () => {
    // use searchFor to search in search bar
    await page.searchFor("Screenshot");
    // take screenshot
    await page.takeScreenshot("screenshots/screenshot");
  });
  // created additional test for editing the "New Employee" entry
  test("Can edit an employee", async () => {
    await page.selectEmployee("New Employee");
    await page.setInput(page.nameEntry, "Neil Soriano");
    await page.setInput(page.phoneEntry, 8904041372);
    await page.setInput(page.emailEntry, "neilsoriano@devmountain.com");
    await page.setInput(page.titleEntry, "QA Tester");
    await page.click(page.saveButton);
    // await page.takeScreenshot("screenshots/newEmployee");
    let currentEmployee = page.getCurrentEmployee();
    expect((await currentEmployee).name).toBe("Neil Soriano");
    expect((await (await currentEmployee).phone)).toEqual(8904041372);
    expect((await currentEmployee).email).toBe("neilsoriano@devmountain.com");
    expect((await currentEmployee).title).toBe("QA Tester");
  });

  // caliing employees wouldn't work inside test
  employees.forEach((newEmployee) => {
    test("Can add and delete an employee", async () => {
    // let newEmployee = {
    //   name: "Test Employee",
    //   phone: 1234567890,
    //   email: "test@email.com",
    //   title: "test person",
    // };
      
      await page.addEmployee(newEmployee);
      let employee = await page.getCurrentEmployee();
      expect(employee.name).toEqual(newEmployee.name);
      expect(employee.phone).toEqual(newEmployee.phone);
      expect(employee.email).toEqual(newEmployee.email);
      expect(employee.title).toEqual(newEmployee.title);
      await page.takeScreenshot("screenshots/newEmployee");

      // updated delete to be able to delete json employee
      await page.deleteEmployee(newEmployee.name);
      let employeeList = await page.getEmployeeList();
      // same update here
      expect(employeeList).not.toContain(newEmployee.name);
      await page.takeScreenshot("screenshots/deletedEmployee");

    
    });
  });
});
