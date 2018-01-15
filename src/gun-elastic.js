const {NodeAdapter} = require('gun-flint');
const elasticsearch = require('elasticsearch');

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
            this.initialized = true;
            let port = elastic.port || '9200';
            let host = elastic.host || 'localhost';
            let query = elastic.query ? '?' + elastic.query : '';
            this.index = elastic.index || 'gun';
            this.type = elastic.type || 'gundb';
	    this.db = new elasticsearch.Client({
		  host: this.host+':'+this,port
	    });
        } else {
            this.initialized = false
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
		if(err) done(err);
		done(null,resp.hits.hits[0]['_source'] || {} );
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

	   this.db.index({
		index: this.index,
		type: this.type,
		id: key,
		body: {
			key: key,
			val: node
		}
	   }, function(err,resp,status){
		if(err) console.log(err);
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
	    console.trace('elasticsearch cluster is down!);
	    this.initialized = false;
	  } else {
	    this.initialized = true;
	  }
	});
    }

});
