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
	type:  'gun_data'
  }
});

console.log('waiting 5 seconds...');
setTimeout(function(){ 
	// access the data as if it is a document.
	gun.get('mark').get('boss').get('name').val(function(data, key){
	  // `val` grabs the data once, no subscriptions.
	  console.log("Mark's boss is", data);
	});
}, 5000);
