import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

import * as employees from "../__tests__/employees.json";

describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });

  beforeEach(async () => {
    await page.navigate();
    page.driver.sleep(3000);
  });

  afterAll(async () => {
    await page.driver.quit();
  });

  // Test #1
  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });

  // Test #2 Add and delete using json dataset
  employees.forEach(person => {
    test("Can add and delete an employee", async () => {  
      //console.log(person) 
      await page.addAndDelete(person);
    });
  })

  // have to use for instead of forEach, dealing with async
  test("Can add and delete an employee", async () => {
    for (const person of employees) {
      //console.log(person)
      await page.addAndDelete(person);
    }
  })
  
  // Test #3 Search for the employees with the title “Screenshot”, and save a screenshot of them
  test("Search for the employees and save a screenshot of them", async () => {
    await page.searchFor("Screenshot");
    await page.takeScreenshot(`../__tests__/screenshots/screenshot_${Date.now()}`)
  })
});