/* cleanup */
try{require('fs').unlinkSync('gun.db');
}catch(e){}

var Gun = require( "gun/gun" );
var gunNot = require('gun/lib/not')
var gunDb = require( "../src/index.js" );

var gun = Gun({
  file: false // turn off pesky file.js data.json default
  , elastic: {
	host: 'elassandra-seed', 
	port:  9200, 
	index: 'gun_es',
	type:  'gun_data',
	store_keys: true,
	store_keys_index: 'gun_es_keys'
  }
});

var mouse = {name: "Jerry", species: "mouse"};
var lorenzo = {name: "Lorenzo", pet: mouse };
var cat = {name: "Fluffy", species: "kitty", enemy: mouse};
var mark = {boss: cat, name: 'Mark', friend: lorenzo};
cat.slave = mark;

// partial updates merge with existing data!
gun.get('mark').put(mark);


console.log('waiting 10 seconds...');
setTimeout(function(){ 
	// access the data as if it is a document.
	gun.get('mark').get('boss').get('name').val(function(data, key){
	  // `val` grabs the data once, no subscriptions.
	  console.log("Mark's boss is", data);
	});
}, 10000);
