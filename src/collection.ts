import { base64Code } from "./code";
import { FETCH_METHOD, IData, IConfig, ICode } from "./type";
import { uuidRemember } from "./uuid";

export class EventCollection {
  protected config: IConfig;
  public data: IData;
  protected customData: Record<string, any> = {};

  constructor(config: IConfig) {
    this.config = config;
    let navigator = window.navigator as any;
    let connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    let dataTime = Intl.DateTimeFormat().resolvedOptions();
    let data = {
      device_id: uuidRemember(),
      device_width: window.screen.width,
      device_height: window.screen.height,
      is_wifi: connection?.type?.toLocaleLowerCase() === "wifi",
      user_agent: navigator.userAgent,
      app_code_name: navigator.appCodeName,
      app_name: navigator.appName,
      language: navigator.language,
      platform: navigator.platform,
      time_zone: dataTime.timeZone,
    } as IData;
    this.data = data;
  }
  // Reinitialize the data
  protected reinitializeData(event: string): IData {
    this.data.event = event;
    this.data.location = window.location;
    this.data.pathname = this.data.location.pathname;
    this.data.begin_time = Date.now();
    this.data.current_url = this.data.location.href;

    this.data.document_url = window.document.documentURI;
    this.data.referrer_url = window.document.referrer;
    this.data.content_type = window.document.contentType;
    this.data.document_title = window.document.title;

    let data = {
      ...this.data,
      ...this.customData,
    } as IData;
    this.data = data;
    return this.data;
  }
  // append custom data
  public addCustomData(customData: Record<string, any> = {}): EventCollection {
    this.customData = { ...this.customData, ...customData };
    return this;
  }
  //Get data
  public getData(event: string): { data: IData; body: string } {
    this.reinitializeData(event);
    let body: string;
    if (this.config.code) {
      body = this.config.code.encode(this.data);
    } else {
      body = JSON.stringify(this.data);
    }
    return { data: this.data, body: body };
  }

  //Sending Data
  public async send(event: string = "load") {
    const { data, body } = this.getData(event);
    if (
      this.config.ignorePathName != undefined &&
      this.config.ignorePathName.includes(data.pathname)
    ) {
      return;
    }
    let options = {
      method: FETCH_METHOD,
      headers: this.config.headers,
      body: body,
    };
    try {
      await fetch(this.config.url, options);
    } catch (err) {
      console.error(err);
    }
  }
}
