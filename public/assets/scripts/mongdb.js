
const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://172.16.8.29:27017/";
var _db;
module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('DBFinal');
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;
  }
};