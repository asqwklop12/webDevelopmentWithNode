const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

function serveStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if(err) {
            res.writeHead(500, {'Content-Type' : 'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, {'Content-Type' : 'text/plain'})
        res.end(data)
    })

}
const server = http.createServer((req,res) => {
    const path = req.url.replace(/\?(?:\?.*)?$/, '').toLowerCase()

    switch (path) {
        case '':
            serveStaticFile(res, '/public/home.html' ,'text/plain')
            break
        case '/about':
            serveStaticFile(res, '/public/about.html' ,'text/plain')
            break
        case '/img/logo.png':
            serveStaticFile(res, '/public/img/logo.png' ,'image/png')
            break
        default:
            serveStaticFile(res, '/public/404' ,'text/html',404)
            break
    }
})

server.listen(port, () => console.log(`server started on port ${port}; ` +
 `press Ctrl-C to terminate....`))