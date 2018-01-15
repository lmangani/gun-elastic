# Gun-Elastic

An Elasticsearch adapter for GunJS.

# Some Considerations

`gun-elastic` stores the each graph node (along with some metadata) in an ES document and uses the key as the '_id'. This makes `gun-elastic` right for some application but not all.

# Installation

`npm install gun-elastic`.

```javascript

const Gun = require('gun');

// Must be added after Gun but before instantiating Gun
require('gun-elastic');

// Instantiate Gun
const gun = new Gun({
    file: false,
    web: httpServer,

    // The following are defaults. You can supply `true` to use all defaults, or overwrite the ones you choose
    elastic: {
        host: 'localhost',
        port: '9200',
        index: 'gun',
        type: 'gun_data'
    }
});
```

# Credit
This extension is made possible by [gun-flint](https://github.com/sjones6/gun-flint) @sjones6

# Issues & Contributing

Issues welcome on [Github](https://github.com/lmangani/gun-elastic/issues).

Community contributions welcome. PRs accepted after code review.
