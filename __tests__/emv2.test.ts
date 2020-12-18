import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";
import * as employees from "../__tests__/employees.json";
import { findSafariDriver } from "selenium-webdriver/safari";
// const employees: Array<Employee> = [
//   {
//     name: "Han Solo",
//     phone: 1111111111,
//     email: "millenium@falcon.rep",
//     title: "Smuggler",
//   },
//   {
//     name: "Luke Skywalker",
//     phone: 2222222222,
//     email: "red5@rogue.rep",
//     title: "Jedi",
//   },
//   {
//     name: "Thrawn",
//     phone: 3333333333,
//     email: "gathrawn@admiralty.emp",
//     title: "Best Villain",
//   },
//   {
//     name: "R2-D2",
//     phone: 4444444444,
//     email: "pottymouth@astromech.rep",
//     title: "Crotchety Old Droid",
//   },
//   {
//     name: "Ronaldo",
//     phone: 1231231234,
//     email: "ronaldo@gmail.com",
//     title: "International Soccer Player",
//   },
//   {
//     name: "Christian Pulisic",
//     phone: 8017891235,
//     email: "cpulisic@yahoo.com",
//     title: "USA Soccer Player",
//   },
// ];

// const fs = require('fs');
// fs.writeFile(
//   `${__dirname}/employees.json`, 
//   JSON.stringify(employees,null, " "),
//   (bacon)=>{
//     if(bacon) console.error(bacon)
//     else console.log("the file was save")
//   }

// )

// fs.writeFile(`${__dirname}/answers.txt`, 
// ` 1. Are these test stable/will they give us false positives?
//     It depends, the automation test is stable if we write a good function 
//     that can test the software that meet the requirement. So for this simple Employee Manager application 
//     I think the automation test is good for testing.  
//   2. Do these tests miss bugs you could find manually following the same processes?
//     If the functions of the automation tests are not good enough to cover all the requirements that we need
//     to pass it, it may will miss bugs and we need to manually testing. Also, we can not use automation for all the
//     test, sometimes we need to use manually testing fo test the software.
//   3. What would you change about the testing if you were given enough time?
//     I would create some more automation test for each requirements of the Employee Manager or maybe some acceptance testing.
//     Also create some more methods or function the test. 
//   `, 
//   (e)=>{
//     if(e) console.error(e)
//     else console.log("file saved successfully")
// })

describe("employee manager v2", () => {
  const page = new EmployeeManager({ browser: "chrome" });
  beforeEach(async () => {
    await page.navigate();
  });
  afterAll(async () => {
    await page.driver.quit();
  });

  test("Searching employee with title ScreenShot, and save a screenshot of them to new screenshot folder using POM", async()=>{
    //searching Screenshot
    await page.searchFor("Screenshot");
    //taking screenshot and name file employee then save it in screenShot folder
    await page.takeScreenshot("screenShot/screenshotSearch");
  })


  test("Searching narrows the list", async () => {
    let originalList = await page.getEmployeeList();
    await page.searchFor("Bill");
    await page.takeScreenshot("screenShot/Bill");
    let resultList = await page.getEmployeeList();
    expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);
    
  });

  //loop through each employee in record.
  employees.forEach((newEmployee)=>{
    test("Can add and delete an employee", async () => {
      // let newEmployee = {
      //   name: "Test Employee",
      //   phone: 1234567890,
      //   email: "test@email.com",
      //   title: "test person",
      // };
      await page.addEmployee(newEmployee);
      //take screenshot after add new employee
      await page.takeScreenshot(`screenShot/${newEmployee.name}`);
      let employ = await page.getCurrentEmployee();
      expect(employ.name).toEqual(newEmployee.name);
      expect(employ.phone).toEqual(newEmployee.phone);
      expect(employ.email).toEqual(newEmployee.email);
      expect(employ.title).toEqual(newEmployee.title);
      await page.deleteEmployee(newEmployee.name);
      let employeeList = await page.getEmployeeList();
      expect(employeeList).not.toContain(newEmployee.name);
    });
  })
});
