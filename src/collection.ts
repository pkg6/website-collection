import { FETCH_METHOD, IData, IConfig } from "./type";
import { uuidRemember } from "./uuid";

export class EventCollection {
  protected config: IConfig;
  protected navigator: any;
  public data: IData;
  protected customData: Record<string, any> = {};

  constructor(config: IConfig) {
    this.config = config;
    this.navigator = window.navigator;
    let connection =
      this.navigator.connection ||
      this.navigator.mozConnection ||
      this.navigator.webkitConnection;

    let dataTime = Intl.DateTimeFormat().resolvedOptions();
    let data = {
      device_id: uuidRemember(),
      device_width: window.screen.width,
      device_height: window.screen.height,
      is_wifi: connection?.type?.toLocaleLowerCase() === "wifi",
      user_agent: this.navigator.userAgent,
      app_code_name: this.navigator.appCodeName,
      app_name: this.navigator.appName,
      language: this.navigator.language,
      platform: this.navigator.platform,
      time_zone: dataTime.timeZone,
    } as IData;
    this.data = data;
  }
  public getData(event: string): IData {
    this.data.event = event;
    this.data.location = window.location;
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

  public addCustomData(customData: Record<string, any> = {}): EventCollection {
    this.customData = { ...this.customData, ...customData };
    return this;
  }

  public setInterval(ms: number) {
    setInterval(() => {
      this.send("timer");
    }, ms);
  }

  public async send(event: string = "load") {
    this.getData(event);
    if (
      this.config.ignorePathName != undefined &&
      this.config.ignorePathName.includes(this.data.location.pathname)
    ) {
      return;
    }

    let options = {
      method: FETCH_METHOD,
      headers: this.config.headers,
      body: JSON.stringify(this.data),
    };
    try {
      await fetch(this.config.url, options);
    } catch (err) {
      console.error(err);
    }
  }
}
