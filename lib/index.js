"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("./collection");
const uuid_1 = require("./uuid");
(0, uuid_1.uuidRemember)();
window.EventCollection = collection_1.EventCollection;
