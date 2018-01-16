const {NodeAdapter} = require('gun-flint');
const elasticsearch = require('elasticsearch');
const Gun = require('gun/gun');

var _debug = false;
var returnErr = function(err,code) {
	var error = { message: err, code: function(){ return code; } };
	return error;
};

module.exports = new NodeAdapter({

    /**
     * @type {boolean}  Whether or not the adapter has been properly initialized and can attempt DB connections
     */
    initialized: false,

    /**
     * Handle Initialization options passed during Gun initialization of <code>opt</code> calls.
     * 
     * Prepare the adapter to create a connection to the Elasticsearch server
     * 
     * @param {object}  context    The full Gun context during initialization/opt call
     * @param {object}  opt        Options pulled from fully context
     * 
     * @return {void}
     */
    opt: function(context, opt) {
        let elastic = opt.elastic || null;
        if (elastic) {
            let port = elastic.port || '9200';
            let host = elastic.host || 'localhost';
            let query = elastic.query ? '?' + elastic.query : '';
            this.index = elastic.index || 'gun';
            this.type = elastic.type || 'gundb';
	    this.db = new elasticsearch.Client({
		  host: host+':'+port
	    });

	    this.store_node = elastic.store_nodes || true;
	    this.store_keys = elastic.store_keys || false;
	    this.store_keys_index = elastic.store_keys_index || this.index;
	    this.store_keys_type = elastic.store_keys_type || this.type;

	    if (opt.debug) _debug = true;
            this.initialized = true;

        } else {
            this.initialized = false;
        }
    },

    /**
     * Retrieve results from the DB
     * 
     * @param {string}   key    The key for the node to retrieve
     * @param {function} done   Call after retrieval (or error)
     *
     * @return {void}
     */
    get: function(key, done) {
        if (this.initialized) {
	   // query ES
	   this.db.search({
		index: this.index,
		type: this.type,
		body: {
		  query: {
		    match: { "_id": key }
		  },
		  size: 1
		}
	   }, function(err,resp,status){
		_debug && console.log(status,resp);
		if(err) done(returnErr(err,status));
		else if(resp.hits.total == 0) done(null);
		else if(resp.hits.hits) {
			_debug && console.log(status,resp.hits.hits[0]);
			done(null,resp.hits.hits[0]['_source'].val);
		}
		return;
	   });
        }
    },

    /**
     * Write nodes to the DB
     * 
     * @param {string}   key   The key for the node
     * @param {object}   node  The full node with metadata
     * @param {function} done  Called when the node has been written
     * 
     * @return {void}
     */
    put: function(key, node, done) {

        if (this.initialized) {

	// Optional Key Storage
	   if (this.store_keys) {
		  // Emulate Elassandra Table w/ node KV
		  var rows = [];
		  var row_insert = { index:  { _index: this.store_key_index, _type: this.store_key_type } };
		  Gun.node.is(node, function(a,b,c,d) {
			var row = { field: b, soul: d, state: new Date().getTime() };
			if (c[b] instanceof Object ) {
				row.relation = c[b]['#'];
				row.value = "";
			} else {
				row.relation = "";
				row.value = c[b];
			}
			rows.push(row_insert);
			rows.push(row);
			_debug && console.log(row);
		  });

		  this.db.bulk({
			body: rows
		  }, function (err, resp, status) {
			_debug && console.log(err,resp,status);
			if(err) _debug && console.log(err);
			_debug && console.log(resp);
	          });
	   }

	// Full Node Storage
	   this.db.index({
		index: this.index,
		type: this.type,
		id: key,
		body: {
			key: key,
			val: node
		}
	   }, function(err,resp,status){
		_debug && console.log(err,resp,status);
		if(err) _debug && console.log(err);
		done;
	   });

        }



    },

    /**
     * Ping ES cluster and set status
     * 
     * @return {object}   A collection to query
     */
    pingEs: function() {
        this.db.ping({
	  // ping usually has a 3000ms timeout
	  requestTimeout: 5000
	}, function (error) {
	  if (error) {
	    console.trace('elasticsearch cluster is down!');
	    this.initialized = false;
	  } else {
	    this.initialized = true;
	  }
	});
    }
   
});
