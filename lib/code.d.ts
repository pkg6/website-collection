import { ICode, IData } from "./type.js";
export declare class base64Code implements ICode {
    encode(data: IData): string;
    decode(encodedData: string): IData;
}
