import { Employee } from "./pageObjects/EmployeeManager";

const fs = require('fs')
let employees: Array<Employee> = [
    {
      name: "Han Solo",
      phone: 1111111111,
      email: "millenium@falcon.rep",
      title: "Smuggler",
    },
    {
      name: "Luke Skywalker",
      phone: 2222222222,
      email: "red5@rogue.rep",
      title: "Jedi",
    },
    {
      name: "Thrawn",
      phone: 3333333333,
      email: "gathrawn@admiralty.emp",
      title: "Best Villain",
    },
    {
      name: "R2-D2",
      phone: 4444444444,
      email: "pottymouth@astromech.rep",
      title: "Crotchety Old Droid",
    },
  ];
  
  fs.writeFile(
     `${__dirname}/dataAssets/employees.json`,
     JSON.stringify(employees, null, " "),
     (e) =>{
         if (e) console.error(e)

         else console.log('File Saved Successfully')
     }
  ) 