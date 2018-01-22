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
#### Filtered Network Relations
Search and Display node relations using the [kbn_graph](https://github.com/lmangani/kbn_graph) plugin
<img width=800 src="https://user-images.githubusercontent.com/1423657/35195017-6f6ba2fa-febd-11e7-9a17-83b877cb61fc.gif"/>

#### Circular Sankey
<img width=800 src="https://user-images.githubusercontent.com/1423657/35231460-273eccc8-ff99-11e7-9d7a-39a0edb497a6.gif"/>

### Todo
* [x] Optional Key Storage in secondary index
* [ ] Authentication support, array of servers, etc
* [ ] Add tests with ES mockups

## Credit
This extension is made possible by [gun-flint](https://github.com/sjones6/gun-flint) @sjones6

## Issues & Contributing

Issues welcome on [Github](https://github.com/lmangani/gun-elastic/issues).

Community contributions welcome. PRs accepted after code review.
