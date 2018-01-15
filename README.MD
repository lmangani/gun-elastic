<p>
    <a href="http://gun.js.org/"><img width="25%" src="https://cldup.com/TEy9yGh45l.svg"/></a>
</p> 

# Gun-Elastic
Elasticsearch native persistence layer for [Gun](https://github.com/amark/gun)

[Gun](https://github.com/amark/gun) is a realtime, distributed, offline-first, graph database engine.

### THIS IS EXPERIMENTAL WORK IN PROGRESS! USE AT YOUR OWN RISK!
#### Comments and PR/Contributions are super welcome!

-------------
## Installation

`npm install gun-elastic`.

```javascript

const Gun = require('gun');

// Must be added after Gun but before instantiating Gun
require('gun-elastic');

// Instantiate Gun
const gun = new Gun({
    file: false,
    web: httpServer,

    // The following are defaults.
    elastic: {
        host: 'localhost',
        port: '9200',
        index: 'gun_es',
        type: 'gun_data'
    }
});
```

## Screenshot
![image](https://user-images.githubusercontent.com/1423657/34941573-98c95322-f9f4-11e7-992b-1f94e10a45eb.png)

### Todo
* [ ] Authentication support, array of servers, etc
* [ ] Add tests with ES mockups

## Credit
This extension is made possible by [gun-flint](https://github.com/sjones6/gun-flint) @sjones6

## Issues & Contributing

Issues welcome on [Github](https://github.com/lmangani/gun-elastic/issues).

Community contributions welcome. PRs accepted after code review.
