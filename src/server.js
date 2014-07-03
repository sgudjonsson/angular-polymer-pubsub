var express = require('express'),
    app = express(),
    port = 3000;

app.use(express.static(__dirname + '/public'));
app.use("/vendors", express.static(__dirname +'/../bower_components'));

app.post('/api/login', function(req, res) {
    res.json({ isAuthorized: true });
});

app.post('/api/logout', function(req, res) {
    res.json({ isAuthorized: false });
})

app.listen(port, function() {
    console.log('Listening on port %s', port);
})