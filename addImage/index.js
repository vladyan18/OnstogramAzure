
var Pool = require('pg').Pool;
var config = require('./config.js');
var pool = new Pool(config);


module.exports = function (context, req) {

 context.log('JavaScript HTTP trigger function processed a request.');

  context.log(JSON.stringify(req.body.data));
  let response = decodeBase64Image(context, req.body.data);

 context.log('filename: ' + req.name);

 context.log('filetype: ' + response.type);

 context.bindings.outputBlob = response.data;


var r = [];
    r.push(req.body.user_id);
    r.push('https://onstoblob.blob.core.windows.net/blob-container/' + req.body.filename)

  pool.connect()
    .then((client) => {
      client.query('insert into public."Images" (user_id, url) values ($1, $2) ', r)
        .then((res) => {
          context.log('Successfully inserted');
          
           context.res = {

 // status: 200, /* Defaults to 200 */

          body: "Uploaded " 

            };
          client.release();
          context.done();

          
        })
        .catch((err) => {
          client.release();
          context.log(err);
          context.done();
        });
    })
    .catch((err) => {
      context.log(err);
      context.done();
    });

};

function decodeBase64Image(context, data) {

 var matches = [];

 var response = {}

 response.type = "image/jpg";

 context.log(data);
 response.data = Buffer.from(data, 'base64');

 return response;

}