declare module 'auto-marker' {
  /**
  Mark automtically exit or entrance in the TimeNet platform

  1 = enter
  2 = exit

  @example
  ```
  import AutoMarker from 'auto-marker'

  const marker = new AutoMaker(1234, 1)
  marker.start()
  ```

  And the outptut will see something similar to "AutoMaker did it for you, new mark at 14:36"
  */
  export default class AutoMarker {
    constructor(pinCode: number, markAction: number)
    start(): Promise<any>
    navigateTo(url: string): void
    waitUntil(cssSelector: string): Promise<any>
    waitFor(ms: number): Promise<any>
    inputInElement(cssSelector: string, text: string): Promise<any>
    clickElement(cssSelector: string): Promise<any>
    queryDom(cssSelector: string): Promise<any>
    closeBrowser(): void
  }
}
