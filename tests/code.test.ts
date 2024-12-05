import { base64Code } from "../src/code";
import { ICode, IData } from "../src/type";
import { v4 as uuidv4 } from "uuid";

describe("Code class", () => {
  let code: ICode;

  beforeEach(() => {
    code = new base64Code();
  });

  it("should encode data to a Base64 string", () => {
    const data: IData = {
      device_id: uuidv4(),
      event: "",
      user_agent: "",
      device_width: 0,
      device_height: 0,
      is_wifi: false,
      app_code_name: "",
      app_name: "",
      language: "",
      platform: "",
      time_zone: "",
      location: undefined,
      current_url: "",
      document_url: "",
      referrer_url: "",
      content_type: "",
      document_title: "",
      begin_time: 0,
      pathname: "",
    };
    const encoded = code.encode(data);

    // 验证结果是字符串
    expect(typeof encoded).toBe("string");
    // 验证 Base64 编码格式
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    expect(base64Regex.test(encoded)).toBe(true);
  });

  it("should decode a Base64 string to the original data", () => {
    const data: IData = {
      device_id: uuidv4(),
      event: "fetch",
      user_agent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      device_width: 0,
      device_height: 0,
      is_wifi: false,
      app_code_name: "",
      app_name: "",
      language: "",
      platform: "",
      time_zone: "",
      current_url: "",
      document_url: "",
      referrer_url: "",
      content_type: "",
      document_title: "",
      begin_time: 0,
      pathname: "",
    };
    const encoded = code.encode(data);
    const decoded = code.decode(encoded);
    console.log(encoded);
    console.log(decoded);
    // 验证解码后数据与原数据一致
    expect(decoded).toEqual(data);
  });

  it("should throw an error when decoding an invalid Base64 string", () => {
    const invalidBase64 = "invalid_base64_string";

    // 捕获异常，验证是否抛出错误
    expect(() => {
      code.decode(invalidBase64);
    }).toThrow();
  });

  it("should handle empty objects correctly", () => {
    const data: IData = {
      device_id: "",
      event: "",
      user_agent: "",
      device_width: 0,
      device_height: 0,
      is_wifi: false,
      app_code_name: "",
      app_name: "",
      language: "",
      platform: "",
      time_zone: "",
      location: undefined,
      current_url: "",
      document_url: "",
      referrer_url: "",
      content_type: "",
      document_title: "",
      begin_time: 0,
      pathname: "",
    };
    const encoded = code.encode(data);
    const decoded = code.decode(encoded);

    // 验证空对象的处理
    expect(decoded).toEqual(data);
  });
});
