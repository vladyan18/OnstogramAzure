
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.vcode) {
        var xhr = new XMLHttpRequest();
        context.log(req.query.vcode);
        xhr.open('GET', 'https://oauth.vk.com/access_token?client_id=6292953&client_secret=XIHX2kdgYNhtI7EsrDfl&code=' + req.query.vcode, false);
        xhr.setRequestHeader('origin', 'onstogram.azurewebsites.net')
        xhr.send();

// 4. Если код ответа сервера не 200, то это ошибка
if (xhr.status != 200) {
  // обработать ошибку
  context.log( xhr.status + ': ' + xhr.statusText + xhr.responseText); // пример вывода: 404: Not Found
} else {
  // вывести результат
        context.res.setHeader('Access-Control-Allow-Origin', '*')
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: xhr.responseText
        };
}


    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};