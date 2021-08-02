import { Builder, By, Capabilities } from "selenium-webdriver";
const fs = require('fs')
const chromedriver = require("chromedriver")
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()



test("snapshot test", async () => {
    await driver.get("https://www.google.com")

    let searchBar = await driver.findElement(By.name('q'))
    await searchBar.sendKeys('lion\n')

fs.writeFile(
    `${__dirname}/../Screenshots/employee.png`,
    await driver.takeScreenshot(),
    "base64",
    (e) => {
      if(e) console.log(e);
      else console.log("screenshot saved successfully");
    }
)
await driver.quit()
    })
