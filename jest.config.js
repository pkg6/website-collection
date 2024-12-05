module.exports = {
  preset: "ts-jest", // 使用 ts-jest 处理 TypeScript 文件
  testEnvironment: "node", // 使用 Node.js 作为测试环境
  moduleFileExtensions: ["ts", "js"], // 识别的文件扩展名
  testMatch: ["**/?(*.)+(spec|test).[tj]s"], // 测试文件匹配模式
};
