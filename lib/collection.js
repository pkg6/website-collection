"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCollection = void 0;
const type_1 = require("./type");
const uuid_1 = require("./uuid");
class EventCollection {
    constructor(config) {
        var _a;
        this.customData = {};
        this.config = config;
        this.navigator = window.navigator;
        let connection = this.navigator.connection ||
            this.navigator.mozConnection ||
            this.navigator.webkitConnection;
        let dataTime = Intl.DateTimeFormat().resolvedOptions();
        let data = {
            device_id: (0, uuid_1.uuidRemember)(),
            device_width: window.screen.width,
            device_height: window.screen.height,
            is_wifi: ((_a = connection === null || connection === void 0 ? void 0 : connection.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === "wifi",
            user_agent: this.navigator.userAgent,
            app_code_name: this.navigator.appCodeName,
            app_name: this.navigator.appName,
            language: this.navigator.language,
            platform: this.navigator.platform,
            time_zone: dataTime.timeZone,
        };
        console.log(config);
        this.data = data;
    }
    getData(event) {
        this.data.event = event;
        this.data.location = window.location;
        this.data.begin_time = Date.now();
        this.data.current_url = this.data.location.href;
        this.data.document_url = window.document.documentURI;
        this.data.referrer_url = window.document.referrer;
        this.data.content_type = window.document.contentType;
        let data = Object.assign(Object.assign({}, this.data), this.customData);
        this.data = data;
        return this.data;
    }
    addCustomData(customData = {}) {
        this.customData = Object.assign(Object.assign({}, this.customData), customData);
        return this;
    }
    setInterval(ms) {
        setInterval(() => {
            this.send("timer");
        }, ms);
    }
    send() {
        return __awaiter(this, arguments, void 0, function* (event = "load") {
            this.getData(event);
            if (this.config.ignorePathName != undefined &&
                this.config.ignorePathName.includes(this.data.location.pathname)) {
                return;
            }
            let options = {
                method: type_1.FETCH_METHOD,
                headers: this.config.headers,
                body: JSON.stringify(this.data),
            };
            try {
                yield fetch(this.config.url, options);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.EventCollection = EventCollection;
