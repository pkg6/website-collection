import { base64Code } from "./code";
import { EventCollection } from "./collection";
import { uuidRemember } from "./uuid";
uuidRemember();
(window as any).EventCollection = EventCollection;
(window as any).base64code = new base64Code();
