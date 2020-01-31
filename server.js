const http = require('http');
const fs = require('fs')

http.createServer((request, response) => {
    if (request.url != '/favicon.ico') {
        if (request.url.endsWith('.css')) fs.readFile('styles/' + request.url.slice(1), 'utf8', (err, data) => {
            if (err) throw err;

            response.setHeader('Content-Type', 'text/css');
            response.statusCode = 200;
            response.write(data);
            response.end();

            let promise = new Promise(() => console.log(111))
        })
        else if (request.url.endsWith('.js')) fs.readFile('client_scripts/' +  request.url.slice(1), 'utf8', (err, data) => {
            if (err) throw err;

            response.setHeader('Content-Type', 'text/javascript');
            response.statusCode = 200;
            response.write(data);
            response.end();

            let promise = new Promise(() => console.log(222))
        })
        else if (request.url.endsWith('.jpg')) fs.readFile(request.url.slice(1), (err, data) => {
            if (err) throw err;

            response.setHeader('Content-Type', 'text/jpg');
            response.statusCode = 200;
            response.write(data);
            response.end();
            
            let promise = new Promise(() => console.log(333))
        })
        else getPage(request.url, response);
    }
}).listen(8000, () => console.log('Server is on')); 

function getPage(name, response, statusCode = 200) {
    if (name == '/') name ='index';

    fs.readFile('pages/' + name + '.html', 'utf8', (err, content) => {
        if (!err) {
            fs.readFile('layouts/default.html', 'utf8', (err, layout) => {
                if (err) throw err;
//непонятно как работает следующая схема сверху вниз
                layout = layout.replace(/\{\{get content\}\}/g, content);
                
                let title = content.match(/\{\{set title "(.*?)"\}\}/);

                if (title) {
                    layout = layout.replace(/\{\{get title\}\}/g, title[1]);

                    layout = layout.replace(/\{\{set title "(.*?)"\}\}/, '');
                }

                fs.readFile('elems/menu.html', 'utf8', (err, menu) => {
                    if (err) throw err;
    
                    layout = layout.replace(/\{\{get menu\}\}/g, menu);
    
                    fs.readFile('elems/footer.html', 'utf8', (err, footer) => {
                        if (err) throw err;
    
                        layout = layout.replace(/\{\{get footer\}\}/g, footer);
    
                        response.setHeader('Content-Type', 'text/html');
                        response.statusCode = statusCode;
                        response.write(layout);
                        response.end();
                    })
                })
            })
            
        } else {
            if (statusCode != '404') getPage('404', response, 404);
            else throw err;
        }
    })
}