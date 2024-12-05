"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64Code = void 0;
const buffer_1 = require("buffer");
class base64Code {
    encode(data) {
        // 将对象转换为 JSON 字符串后进行 Base64 编码
        return buffer_1.Buffer.from(JSON.stringify(data)).toString("base64");
    }
    decode(encodedData) {
        // 将 Base64 字符串解码为 JSON 字符串后解析为对象
        return JSON.parse(buffer_1.Buffer.from(encodedData, "base64").toString("utf-8"));
    }
}
exports.base64Code = base64Code;
