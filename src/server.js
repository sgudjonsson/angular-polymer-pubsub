var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use("/vendors", express.static(__dirname +'/../bower_components'));

app.post('/api/login', function(req, res) {
	if(req.body.password == 'stupid')
		res.send(400, 'Don\'t be stupid');
	else
    	res.json({ isAuthenticated: true, token: '1234567890' });
});

app.post('/api/logout', function(req, res) {
    res.json({ isAuthenticated: false, token: undefined });
})

app.listen(port, function() {
    console.log('Listening on port %s', port);
})