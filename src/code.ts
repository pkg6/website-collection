import { ICode, IData } from "./type";
import { Buffer } from "buffer";

export class base64Code implements ICode {
  encode(data: IData): string {
    // 将对象转换为 JSON 字符串后进行 Base64 编码
    return Buffer.from(JSON.stringify(data)).toString("base64");
  }

  decode(encodedData: string): IData {
    // 将 Base64 字符串解码为 JSON 字符串后解析为对象
    return JSON.parse(Buffer.from(encodedData, "base64").toString("utf-8"));
  }
}
