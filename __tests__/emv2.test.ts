import { EmployeeManager, Employee } from "./pageObjects/EmployeeManager";

// you don't need to set the JSON in a new folder, but I thought it was a good example
import * as employees from "../employees.json";

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

//<solution code> 
  test("Screenshotting the 'screenshot' employees", async () => {
    // we need to search for the right group of employees
    await page.searchFor("Screenshot");
    // and then we can take the screenshot -- though I did have to make the folder "screenshots" manually first
    await page.takeScreenshot("./__tests__/files/screenshots/Screenshot");
  });
  //I literally wrapped the old add/delete test in a loop, and updated a few parameters.
  //That's it.
  employees.forEach((newEmployee) => {
    //I updated the test name
    test(`Can add and delete an employee (newEmployee.name)`, async () => {
      await page.addEmployee(newEmployee);
      let employee = await page.getCurrentEmployee();
      expect(employee.name).toEqual(newEmployee.name);
      expect(employee.phone).toEqual(newEmployee.phone);
      expect(employee.email).toEqual(newEmployee.email);
      expect(employee.title).toEqual(newEmployee.title);
      //had to update this argument
      await page.deleteEmployee(newEmployee.name);
      let employeeList = await page.getEmployeeList();
      //and this one
      expect(employeeList).not.toContain(newEmployee.name);
    });
  });
//</solution code>

//<my code>
  //editing the test to add/delete
  //looping through each employee record in the new .json file.
  /*employees.forEach((newEmployee) => {
    test("Can add and delete an employee", async () => {
      //add code block goes here
      await page.addEmployee(newEmployee);
      let employee = await page.getCurrentEmployee();
      expect(employee.name).toEqual(newEmployee.name);
      expect(employee.phone).toEqual(newEmployee.phone);
      expect(employee.email).toEqual(newEmployee.email);
      expect(employee.title).toEqual(newEmployee.title);
      //delete code block goes here
      //changed from "test employee" to newEmployee.name
      await page.deleteEmployee(newEmployee.name);
      let employeeList = await page.getEmployeeList();
      expect(employeeList).not.toContain(newEmployee.name);
    });
  });*/

  //Search for the employees with the title “Screenshot”, 
  //and save a screenshot of them to a new screenshot folder 
  //using the page object method provided.
  /*test("Searching for 'screenshot' employees, and screnshotting the correct results", async () => {
    //search for 'screenshot' employees
    await page.searchFor("Screenshot");
    //screenshot 'screenshot' employees
    await page.takeScreenshot("__tests__/files/screenshots/screenshot");
  });*/
//</my code>

  //adding this as practice
  //add the list of app employees to a text file
  test("Add a list of app employees to a text file", async () => {
    //get employees from app
    let originalList = await page.getEmployeeList();
    //let str = JSON.stringify(await page.getEmployeeList());
    //let str = JSON.stringify(originalList.map());
    const obj = JSON.parse(JSON.stringify(originalList));
    //let str = JSON.stringify(await originalList);
    await page.sendTextFile("__tests__/files/textFiles/appEmployees", `${obj}`);
  });
    
    //send employee to text file
    //await page.sendTextFile("./__tests__/files/textFiles/appEmployees", `${str}`)
    //test("Searching narrows the list", async () => {
      //let originalList = await page.getEmployeeList();
      //await page.searchFor("Bill");
      //let resultList = await page.getEmployeeList();
      //expect(originalList.length).toBeGreaterThanOrEqual(resultList.length);

      //console.log(JSON.stringify(originalList, null, 2));
    //});
  
/*
  var cells = str.split('\n').map(function (el) { return el.split(/\s+/); });
  var headings = await originalList.shift();
  var obj = await originalList.map(function (el) {
    var obj = {};
    for (var i = 0, l = el.; i < l; i++) {
      obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
    }
    return obj;
  });
  var json = JSON.stringify(obj);*/


  //adding this as practice
  //add the list of json employees to a text file
  test("Add a list of json employees and app employees to text files", async () => {
    //get employees from app
    //let originalList = await page.getEmployeeList();
    let str = JSON.stringify(employees); //how do I remove the formatting stuff, so that it is only name: This Guy, not "name": "This Guy"?
    //send employee to text file
    await page.sendTextFile("__tests__/files/textFiles/jsonEmployees", `${str}`)
  });
});
