import { base64Code } from "./src/code";
import { EventCollection } from "./src/collection";
import { uuidRemember } from "./src/uuid";
uuidRemember();
(window as any).EventCollection = EventCollection;
(window as any).base64code = new base64Code();
