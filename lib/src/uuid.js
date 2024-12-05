"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidRemember = uuidRemember;
const uuid_1 = require("uuid");
const type_1 = require("./type");
function uuidRemember(key = type_1.USER_UUID) {
    let uuid = window.localStorage.getItem(key);
    if (!uuid) {
        uuid = (0, uuid_1.v4)();
        window.localStorage.setItem(key, uuid);
    }
    return uuid;
}
