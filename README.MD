<p>
    <a href="http://gun.js.org/"><img width="25%" src="https://cldup.com/TEy9yGh45l.svg"/></a>
</p> 

# Gun-Elastic
Elasticsearch native persistence layer for [Gun](https://github.com/amark/gun), a realtime, distributed, offline-first, graph database engine.

This `gun` storage adapter interfaces with Elasticsearch using an extended `flint node` strategy:
* `get` request expect to read an entire Gun node.
* `put` requests write an entire Gun node.
  * `node` key-value structure _(soul,relation,field,value,state)_ optionally saved to secondary index

### THIS WORK IS EXPERIMENTAL WORK IN PROGRESS! USE AT YOUR OWN RISK!
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
        type: 'gun_data',
        
        store_keys: false,
        store_keys_index: 'gun_es_keys'
    }
});
```

## Screenshots
#### Network Relations
<img width=800 src="https://user-images.githubusercontent.com/1423657/34941573-98c95322-f9f4-11e7-992b-1f94e10a45eb.png"/>

#### Circular Sankey
<img width=500 src="https://user-images.githubusercontent.com/1423657/34949865-b084e0fe-fa11-11e7-8456-f9f49fef4098.png"/>

### Todo
* [x] Optional Key Storage in secondary index
* [ ] Authentication support, array of servers, etc
* [ ] Add tests with ES mockups

## Credit
This extension is made possible by [gun-flint](https://github.com/sjones6/gun-flint) @sjones6

## Issues & Contributing

Issues welcome on [Github](https://github.com/lmangani/gun-elastic/issues).

Community contributions welcome. PRs accepted after code review.
