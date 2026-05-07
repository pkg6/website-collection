# website-collection

[![npm version](https://img.shields.io/npm/v/website-collection)](https://www.npmjs.com/package/website-collection)
[![License](https://img.shields.io/npm/l/website-collection)](https://github.com/pkg6/website-collection/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/website-collection)](https://www.npmjs.com/package/website-collection)

Site data collection and reporting library for browser environments. 自动采集网站访问数据并上报。

## Features 特性

- **Device Info** - 自动采集设备信息（屏幕尺寸、设备ID、操作系统等）
- **Network Status** - 检测网络状态（WiFi/移动网络等）
- **Page Tracking** - 自动采集页面信息（URL、标题、来源等）
- **Persistent UUID** - 持久化设备ID，支持跨会话识别用户
- **Custom Data** - 支持添加自定义采集字段
- **Path Filtering** - 支持忽略特定路径不上报
- **Data Encoding** - 支持自定义数据编码方式

## Install 安装

```bash
npm install website-collection
```

## Quick Start 快速开始

### Script Tag

```html
<script src="https://unpkg.com/website-collection/lib/website-collection.js"></script>
<script>
  const collector = new EventCollection({
    url: "https://your-api.com/collect"
  });
  collector.send();
</script>
```

### ES Module / TypeScript

```typescript
import { EventCollection } from 'website-collection';

const collector = new EventCollection({
  url: "https://your-api.com/collect",
  headers: { "Authorization": "Bearer token" }
});

collector.send();
```

## API

### Constructor 配置项

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `url` | `string` | Yes | 数据收集接口地址 |
| `headers` | `object` | No | 请求头 |
| `ignorePathName` | `string[]` | No | 忽略上报的路径列表 |
| `code` | `ICode` | No | 自定义编码器 |

### Methods 方法

| Method | Description |
|--------|-------------|
| `send(eventName?)` | 发送数据到收集接口 |
| `addCustomData(data)` | 添加自定义字段 |
| `getData(event?)` | 获取采集的数据 |
| `getDeviceId()` | 获取设备ID |

## Usage Examples 使用示例

### Basic Usage 基础用法

```typescript
const collector = new EventCollection({
  url: "https://your-api.com/collect"
});

// 页面加载时发送
collector.send('page_view');
```

### With Custom Headers 带请求头

```typescript
const collector = new EventCollection({
  url: "https://your-api.com/collect",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer your-token"
  }
});
```

### Custom Data 自定义数据

```typescript
const collector = new EventCollection({
  url: "https://your-api.com/collect"
});

// 添加自定义字段
collector.addCustomData({
  userId: '12345',
  plan: 'premium'
});

collector.send();
```

### Ignore Paths 忽略路径

```typescript
const collector = new EventCollection({
  url: "https://your-api.com/collect",
  ignorePathName: ['/login', '/register', '/admin']
});

// 访问 /login 时不会发送数据
collector.send();
```

### Periodic Reporting 定时上报

```typescript
const collector = new EventCollection({
  url: "https://your-api.com/collect"
});

setInterval(() => {
  collector.send('heartbeat');
}, 30000); // 每30秒上报一次
```

## Collected Data 采集数据

| Field | Type | Description |
|-------|------|-------------|
| `device_id` | `string` | 设备唯一标识（UUID） |
| `event` | `string` | 事件名称 |
| `device_width` | `number` | 屏幕宽度 |
| `device_height` | `number` | 屏幕高度 |
| `is_wifi` | `boolean` | 是否WiFi网络 |
| `user_agent` | `string` | 用户代理 |
| `app_code_name` | `string` | 浏览器代码名 |
| `app_name` | `string` | 浏览器名称 |
| `language` | `string` | 语言设置 |
| `platform` | `string` | 平台信息 |
| `time_zone` | `string` | 时区 |
| `current_url` | `string` | 当前页面URL |
| `pathname` | `string` | 页面路径 |
| `referrer_url` | `string` | 来源页面 |
| `document_title` | `string` | 页面标题 |
| `begin_time` | `number` | 事件发生时间戳 |

## Browser Support 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

Apache-2.0
