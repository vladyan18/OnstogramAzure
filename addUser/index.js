var Pool = require('pg').Pool;
var config = require('./config.js');
var pool = new Pool(config);

module.exports = function (context, req) {
    var r = [];
    r.push(req.body.sub);  
  pool.connect()
    .then((client) => {
    var query = client.query('SELECT exists(SELECT 1 FROM public."Users" WHERE vk_sub=$1) as ex ', r, function(err, result) {
		
    context.log(result);
        
		if(err) {
			context.log('Query error ' + err);
      context.res = {
        status : 502,
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*'
        }
      }
      context.done();
		} else {
        
        if (result.rows[0].ex) {
        context.log('Found');
        context.res = {
            status : 200,
           headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
              }
          }
          client.release();
          context.done();
        }
        else
        {
          context.log('Not Found ');
        r.push(req.body.nickname);
        r.push(req.body.picture);   
         client.query('insert into public."Users" (vk_sub, nickname, avatar_url) values ($1, $2, $3) ', r)
        .then((res) => {
          context.log('Successfully inserted');
        context.res = {
            status : 201,
           headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
            }
        }
          client.release();
          context.done();
        })
        .catch((err) => {
                    context.res = {
            status : 500,
           headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
            }
          client.release();
          context.log(err);
          context.done();
        });
        }
    }
	})



    })
    .catch((err) => {
      context.log(err);
      context.done();
    });
};