import 'chromedriver'
import { Builder, ThenableWebDriver, WebElement, By, WebElementPromise, until } from 'selenium-webdriver'
import { Options as ChromeOptions } from 'selenium-webdriver/chrome'
import { promises as fsp } from 'fs'

export class Browser {
  private driver: ThenableWebDriver

  public constructor(private browserName: string, headless: boolean) {
    const options = new ChromeOptions()

    if (headless) {
      options.headless().windowSize({ width: 1920, height: 1080 })
    } else {
      options.windowSize({ width: 800, height: 600 })
    }

    this.driver = new Builder()
      .forBrowser(browserName)
      .setChromeOptions(options)
      .build()
  }

  public async navigate(url: string): Promise<void> {
    await this.driver.navigate().to(url)
  }

  public findElement(selector: string): WebElementPromise {
    return this.driver.findElement(By.css(selector))
  }

  public findElements(selector: string): Promise<WebElement[]> {
    return this.driver.findElements(By.css(selector))
  }

  public async makeScreenshot(filePath: string): Promise<void> {
    let image = await this.driver.takeScreenshot()
    await fsp.writeFile(filePath, image, { encoding: "base64", flag: 'w' })
  }

  public async waitUntil(selector: string): Promise<any> {
    await this.driver.wait(until.elementLocated(By.css(selector)))
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  public async close(): Promise<void> {
    await this.driver.quit()
  }
}
