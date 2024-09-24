import { EventCollection } from "./collection";
import { uuidRemember } from "./uuid";
uuidRemember();
(window as any).EventCollection = EventCollection;
