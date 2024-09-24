### Install dependencies

```
npm i website-collection
```

### Loading js method

~~~
<script src="https://pkg6.github.io/website-collection/lib/website-collection.js"></script>
~~~

### typescript import

```
import { EventCollection } from 'website-collection/lib/collection';
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
eventCollection.setInterval(1000)
~~~

