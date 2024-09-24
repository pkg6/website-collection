import { FETCH_METHOD, IData, IFetchConfig } from "./type";
import { uuidRemember } from "./uuid";

export class EventCollection {
  protected fetchConfig: IFetchConfig;
  protected navigator: any;
  public data: IData;
  protected customData: Record<string, any> = {};

  constructor(config: IFetchConfig) {
    this.fetchConfig = config;
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
    this.data.begin_time = Date.now();
    this.data.current_url = window.location.href;
    this.data.referrer_url = window.document.referrer;
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
  //https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
  public async send(event: string = "load") {
    this.getData(event);
    let options = {
      method: FETCH_METHOD,
      headers: this.fetchConfig.headers,
      body: JSON.stringify(this.data),
    };
    try {
      const response = await fetch(this.fetchConfig.url, options);
    } catch (err) {
      console.error(err);
    }
  }
}
