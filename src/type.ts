export const USER_UUID = "TZ_USER_UUID";
export const FETCH_METHOD = "POST";

export interface IData {
  device_id: string;
  event: string;

  user_agent: string;
  device_width: number;
  device_height: number;
  is_wifi: boolean;

  app_code_name: string;
  app_name: string;
  language: string;
  platform: string;
  time_zone: string;

  location: Location;
  current_url: string;

  document_url: string;
  referrer_url: string;
  content_type: string;
  document_title: string;

  begin_time: number;
  [propName: string]: unknown;
}

export interface IConfig {
  url: string;
  headers?: HeadersInit;
  ignorePathName?: string[];
}
