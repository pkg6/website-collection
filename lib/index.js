"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("./src/code");
const collection_1 = require("./src/collection");
const uuid_1 = require("./src/uuid");
(0, uuid_1.uuidRemember)();
window.EventCollection = collection_1.EventCollection;
window.base64code = new code_1.base64Code();
