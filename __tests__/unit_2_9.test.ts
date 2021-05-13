import { EmployeeManager } from "./pageObjects/EmployeeManager";

const page = new EmployeeManager("chrome");

// your data will go in this variable
const employees = [
  {
      "employee_id": 155617,
      "employee_name": "_Billy_",
      "employee_phone": "9999996661",
      "employee_email": "ww@ww.ww",
      "employee_title": "New Employee"
  },
  {
      "employee_id": 100,
      "employee_name": "Pavel Buchnevich",
      "employee_phone": "3453454433",
      "employee_email": "buchnevich@nyrangers.com",
      "employee_title": "Right Wing"
  },
  {
      "employee_id": 16000,
      "employee_name": "Luani Kvarfordt",
      "employee_phone": "4356694635",
      "employee_email": "amazing@QA.com",
      "employee_title": "QA Engineer"
  },
  {
      "employee_id": 622,
      "employee_name": "Lou White",
      "employee_phone": "8727813498",
      "employee_email": "LouLou@yahoo.com",
      "employee_title": "Full-Stack Developer"
  },
  {
      "employee_id": 155618,
      "employee_name": "_Screenshot_",
      "employee_phone": "1111111111",
      "employee_email": "abc",
      "employee_title": "New Employee 5/11"
  },
  {
      "employee_id": 200,
      "employee_name": "Mika Zibanejad",
      "employee_phone": "8018018011",
      "employee_email": "zibs@nyrangers.com",
      "employee_title": "Center"
  },
  {
      "employee_id": 155612,
      "employee_name": "Jeff Winger",
      "employee_phone": "1251261278",
      "employee_email": "jwinger@gmail.com",
      "employee_title": "Greendale Professor of Law"
  },
  {
      "employee_id": 155615,
      "employee_name": "Abed Nadir",
      "employee_phone": "9987651234",
      "employee_email": "anadir@greendale.org",
      "employee_title": "cool..cool cool cool"
  },
  {
      "employee_id": 155616,
      "employee_name": "Allie Brie",
      "employee_phone": "1251261278",
      "employee_email": "ab@gmail.com",
      "employee_title": "actress"
  },
  {
      "employee_id": 231,
      "employee_name": "Dimitri Blaiddyd",
      "employee_phone": "2815555555",
      "employee_email": "BoarPrince@hotmail.com",
      "employee_title": "King of Faerghus"
  }
];

describe("checking that the UI matches the DB", () => {
  beforeEach(async () => await page.navigate());
  afterAll(async () => await page.driver.quit());

  for (let i = 0; i < employees.length; i++) {
    test(`Looking for ${employees[i].employee_name} in the UI`, async () => {
      await page.selectEmployee(employees[i].employee_name);
      let employee = await page.getCurrentEmployee();
      expect(employee.id).toEqual(employees[i].employee_id.toString());
      expect(employee.name).toEqual(employees[i].employee_name);
      expect(employee.phone.toString()).toEqual(employees[i].employee_phone);
      expect(employee.email).toEqual(employees[i].employee_email);
      expect(employee.title).toEqual(employees[i].employee_title);
    });
  }

  test("checking employees from an api call", async () => {
    // copied from Postman: GET request - Code - Code snippet: NodeJs - Axios
    var axios = require("axios");

    var config = {
      method: "get",
      url: "https://peaceful-inlet-88854.herokuapp.com/api/employees",
      headers: {},
    };

    return axios(config)
      .then(async function (response) {
        // we get response.data and then use it in test as our dataset
        let employees = response.data;
        for (let i = 0; i < employees.length; i++) {
          await page.selectEmployee(employees[i].employee_name);
          let employee = await page.getCurrentEmployee();
          expect(employee.id).toEqual(employees[i].employee_id.toString());
          expect(employee.name).toEqual(employees[i].employee_name);
          expect(employee.phone.toString()).toEqual(employees[i].employee_phone);
          expect(employee.email).toEqual(employees[i].employee_email);
          expect(employee.title).toEqual(employees[i].employee_title);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

});