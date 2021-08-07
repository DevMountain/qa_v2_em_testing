import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";
import * as ele from "./employeeData.json"


describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });
  /*
  test.skip("Check the title", async () => {
    let title = await page.getText(page.tempTitle);
    expect(title).toBe("Employee Manager");
  });*/
  test.skip("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Paul");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });
  test.skip("Find and screenshot employee", async () => {
    await page.searchFor("Screenshot");
    // will click an employee in the list
    await page.click(page.listedEmployees)
    await page.takeScreenshot("uzofolder/foundit");
  });
  ele.forEach((it) => {
    test("can add and delete employees", async () => {
      await page.addEmployee(it);
      let one = await page.getCurrentEmployee();
      expect(`${one.name}-${one.phone}-${one.email}`).toEqual(`${it.name}-${it.phone}-${it.email}`);
      await page.deleteEmployee(it.name);
      let empList = await page.getEmployeeList();
      expect(empList).not.toContain(it.name);
    });
  });
});
