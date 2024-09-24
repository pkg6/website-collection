import { v4 as uuidv4 } from "uuid";
import { USER_UUID } from "./type";

export function uuidRemember(key: string = USER_UUID): string {
  let uuid = window.localStorage.getItem(key);
  if (!uuid) {
    uuid = uuidv4();
    window.localStorage.setItem(key, uuid);
  }
  return uuid;
}
