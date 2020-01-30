const http = require('http');
const fs = require('fs')

http.createServer((request, response) => {
    if (request.url != '/favicon.ico') {
        if (request.url.endsWith('.css')) fs.readFile(request.url.slice(1), 'utf8', (err, data) => {
            if (err) throw err;

            response.setHeader('Content-Type', 'text/css');
            response.statusCode = 200;
            response.write(data);
            response.end();
        })
        else if (request.url.endsWith('.js')) fs.readFile(request.url.slice(1), 'utf8', (err, data) => {
            if (err) throw err;

            response.setHeader('Content-Type', 'text/javascript');
            response.statusCode = 200;
            response.write(data);
            response.end();
        })
        else if (request.url.endsWith('.jpg')) fs.readFile(request.url.slice(1), (err, data) => {
            if (err) throw err;

            response.setHeader('Content-Type', 'text/jpg');
            response.statusCode = 200;
            response.write(data);
            response.end();
        })
        else getPage(request.url, response);
    }   
}).listen(8000, () => console.log('Server is on')); 

function getPage(name, response, statusCode = 200) {
    if (name == '/') name ='index';

    fs.readFile('pages/' + name + '.html', 'utf8', (err, data) => {
        if (!err) {
            fs.readFile('elems/menu.html', 'utf8', (err, menu) => {
                if (err) throw err;

                data = data.replace(/\{\{menu\}\}/g, menu);

                fs.readFile('elems/footer.html', 'utf8', (err, footer) => {
                    if (err) throw err;

                    data = data.replace(/\{\{footer\}\}/g, footer);

                    response.setHeader('Content-Type', 'text/html');
                    response.statusCode = statusCode;
                    response.write(data);
                    response.end();
                })
            })
        } else {
            if (name != '404') getPage('404', response, 404);
            else throw err;
        }
    })
}