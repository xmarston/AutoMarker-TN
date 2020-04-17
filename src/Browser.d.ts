/**
Helper class to interact with Selenium Webdriver

@example
```
import Browser from './Browser'

const browser = new Browser('chrome', true)
```

With the browser instantiated you can start navigating to a URL and looking into the DOM
*/
import { WebElement, WebElementPromise } from 'selenium-webdriver'

declare class Browser {
  constructor(browserName: string, headless: boolean)
  navigate(url: string): Promise<void>
  findElement(selector: string): WebElementPromise
  findElements(selector: string): Promise<WebElement[]>
  makeScreenshot(filePath: string): Promise<void>
  waitUntil(selector: string): Promise<any>
  delay(ms: number): Promise<any>
  close(): Promise<void>
}
