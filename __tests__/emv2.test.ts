import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";
import * as Employees from '../employees.json';

describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });
test("Can add screenshot", async () => {
    for(let i = 0; i < Employees.length; i++) { //This will loop through each employee in the JSON file
      if(Employees[i]["title"] == "Screenshot"){ // and determine if the title property is equal to Screenshot
        await page.addEmployee(Employees[i]);  //if it is, the patient will be added
        await page.getCurrentEmployee(); // the new patient will be chosen
        await page.takeScreenshot("screenshots/screenshots"); // and a screenshot of the new patient will be taken and saved to the screenshots folder.
      }}
    });
    /* Searching narrows the list will create an array of all employees,
      search for the name Bill, and create a new array with only the employees
      included in the narrowed list, the two arrays will be compared to make
      sure the original array if of greater or equal length to the narrowed list*/

  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
  });
  /* "Can add and delete employees from JSON file" will loop through
      the JSON file and create a new patient for every location within the
      array. Each employee will be added to Employee Manager v2. Each employee will
      be chosen and then the test will compare if the name of the employee added to
      Employee Manager v2 matches the values for name, phone, email, and title in the JSON
      file. Once each is added, they are deleted before the next new employee is added. The
      test verifies that the employee cannot be found in the list after the delete step.*/

    test("Can add and delete employees from JSON file", async () => {
      for(let i = 0; i < Employees.length; i++) {
        let newEmployee = Employees[i];
        await page.addEmployee(newEmployee);
        let employee = await page.getCurrentEmployee();
        expect(employee.name).toEqual(newEmployee.name);
        expect(employee.phone).toEqual(newEmployee.phone);
        expect(employee.email).toEqual(newEmployee.email);
        expect(employee.title).toEqual(newEmployee.title);
        await page.deleteEmployee((Employees[i].name).toString());
        let employeeList = await page.getEmployeeList();
        expect(employeeList).not.toContain((Employees[i].name).toString());
      }
    })
});
