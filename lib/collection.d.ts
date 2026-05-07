import { IData, IConfig } from "./type.js";
export declare class EventCollection {
    protected config: IConfig;
    data: IData;
    protected customData: Record<string, any>;
    constructor(config: IConfig);
    protected reinitializeData(event: string): IData;
    addCustomData(customData?: Record<string, any>): EventCollection;
    getData(event: string): {
        data: IData;
        body: string;
    };
    send(event?: string): Promise<void>;
}
