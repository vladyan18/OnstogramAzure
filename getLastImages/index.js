var Pool = require('pg').Pool;
var config = require('./config.js');
var pool = new Pool(config);

module.exports = function (context, req) {
  pool.connect()
    .then((client) => {
      var query = client.query('SELECT * from public."Images" ORDER BY time DESC LIMIT 2 ', function(err, result) {	
	
  	if(err) {
              context.res = {
            status : 500,
           body : result.rows,
           headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
            }
           }
        } 
        else
        {
        
        context.res = {
            status : 200,
           body : result.rows,
           headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
            }
           }

        }
    context.done();        
	  });
  });
};