const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const handlers = require('./lib/handlers')
app.get('/' ,handlers.home)

app.get('/about', handlers.about)

app.use(handlers.notFound)

app.use(handlers.serverError)

if(require.main === module) {
    app.listen(port, () => console.log(
        `Express stated on http://localhost:${port}` +
        '; press Ctrl-C to terminate.'))
} else {
    module.exports = app
}
