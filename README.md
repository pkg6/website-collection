# website-collection

[![npm version](https://img.shields.io/npm/v/website-collection)](https://www.npmjs.com/package/website-collection)
[![License](https://img.shields.io/npm/l/website-collection)](https://github.com/pkg6/website-collection/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/website-collection)](https://www.npmjs.com/package/website-collection)

Site data collection and reporting library for browser environments.

## Install dependencies

```
npm i website-collection
```

### Loading js method

~~~
<script src="https://pkg6.github.io/website-collection/lib/website-collection.js"></script>
~~~

### typescript import

```
import {EventCollection} from 'website-collection/lib/collection';
```

### Create an instance

 ~~~
 let eventCollection = new EventCollection({url: "https://data.zhiqiang.wang/data-collect/receive",headers:{"token":"123456"}});
 ~~~

### send data

```
eventCollection.send()
```

### setInterval send data

~~~
setInterval(() => {
    eventCollection.send("timer");
}, 1000);
~~~

## API

### EventCollection

#### Constructor Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `url` | `string` | Yes | Data collection endpoint URL |
| `headers` | `object` | No | Custom headers for requests |
| `deviceId` | `string` | No | Custom device ID (auto-generated if not provided) |

#### Methods

| Method | Description |
|--------|-------------|
| `send(eventName?)` | Send data to collection endpoint |
| `getDeviceId()` | Get current device ID |
| `getData()` | Get collected data |

## License

Apache-2.0

