import { Browser } from './Browser'

export default class AutoMarker {
  private browser: Browser
  protected url: string
  protected pinCode: number
  protected markAction: number
  protected timeout: number

  constructor(url: string, pinCode: number, markAction: number) {
    this.url = url
    this.pinCode = pinCode
    this.browser = new Browser('chrome', true)
    this.markAction = markAction
  }

  async start(): Promise<any> {
    try {
      this.navigateTo(this.url)

      await this.waitUntil('.form-control.gpi-input')
      await this.inputInElement('.form-control.gpi-input', this.pinCode.toString())
      await this.clickElement('.container-submit gpi-button button')

      await this.waitUntil(`.container-check-types .container-check-type:nth-of-type(${this.markAction}) button`)
      await this.clickElement(`.container-check-types .container-check-type:nth-of-type(${this.markAction}) button`)

      await new Promise(resolve => setTimeout(resolve, 2000));

      await this.waitUntil('.container-checks .container-check')
      const elements = await this.queryDom('.container-checks .container-check')
      const lastElement = elements[elements.length - 1]

      const lastMarkText: string = await lastElement.getText()
      if (this.checkDiffBetweenDates(lastMarkText)) {
        console.info(`AutoMaker did it for you, new mark at ${lastMarkText}`)
      } else {
        console.error('AutoMaker did not work as expected.')
      }

      this.closeBrowser()
    } catch (errorException) {
      console.error(errorException)
      this.closeBrowser()
    }
  }

  checkDiffBetweenDates(lastElementText: string) {
    const hourArr: string[] = lastElementText.split(':')
    const now: Date = new Date()
    const webDate: Date = new Date()
    webDate.setHours(parseInt(hourArr[0]))
    webDate.setMinutes(parseInt(hourArr[1]))

    const diffMs = Math.abs(now.getTime() - webDate.getTime())
    const diffHours = Math.floor((diffMs % 86400000) / 3600000)
    const diffMinutes = Math.round(((diffMs % 86400000) % 3600000) / 60000)

    if (diffHours == 0 && diffMinutes < 5) {
      return true
    }

    return false
  }

  navigateTo(url: string): void {
    this.browser.navigate(url)
  }

  async waitUntil(cssSelector: string): Promise<any> {
    await this.browser.waitUntil(cssSelector)
  }

  async waitFor(ms: number): Promise<any> {
    await this.browser.delay(ms)
  }

  async inputInElement(cssSelector: string, text: string): Promise<any> {
    await this.browser.findElement(cssSelector).sendKeys(text)
  }

  async clickElement(cssSelector: string): Promise<any> {
    await this.browser.findElement(cssSelector).click()
  }

  async queryDom(cssSelector: string): Promise<any> {
    return await this.browser.findElements(cssSelector)
  }

  closeBrowser(): void {
    this.browser.close()
  }
}
