var _title = 'Jodomax Fashion - Thời trang công sở nữ hàng đầu Việt Nam';
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var exphbs  = require('express3-handlebars');
var helpers = require('./lib/helpers');


var app = express();

// all environments
app.set('port', process.env.PORT || 2999);


hbs = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers      : helpers,
    
    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    partialsDir: [
        'shared/templates/',
        'views/partials/'
    ]
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to expose the app's shared templates to the cliet-side of the app
// for pages which need them.
function exposeTemplates(req, res, next) {
    // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
    // templates which will be shared with the client-side of the app.
    hbs.loadTemplates('shared/templates/', {
        cache      : app.enabled('view cache'),
        precompiled: true
    }, function (err, templates) {
        if (err) { return next(err); }

        // RegExp to remove the ".handlebars" extension from the template names.
        var extRegex = new RegExp(hbs.extname + '$');

        // Creates an array of templates which are exposed via
        // `res.locals.templates`.
        templates = Object.keys(templates).map(function (name) {
            return {
                name    : name.replace(extRegex, ''),
                template: templates[name]
            };
        });

        // Exposes the templates during view rendering.
        if (templates.length) {
            res.locals.templates = templates;
        }

        next();
    });
}

var _countdownHandler = function (req, res) {
  res.render('countdown', {
    title: _title,
    url: req.url,
    isCountDown: true
    //layout: 'countdown'
  });
};

var _notfoundHandler = function(req, res) {
  res.status(400);

  res.render('404', {
    title: _title,
    url: req.url
  });
};

var _otherErrorHandler = function(error, req, res, next) {
  res.status(500);
  res.render('500', {
    title: _title,
    url: req.url,
    error: error
  });
};

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express['static'](path.join(__dirname, 'public')));

// Handle 404
app.use(_notfoundHandler);

// Handle 500
app.use(_otherErrorHandler);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



/*
 * Router section
 */
app.get('/', function (req, res) {
    res.render('index', {
      title: _title,
      url: req.url
    });
});

app.get('/gioi-thieu', function (req, res) {
  res.render('about', {
    title: _title,
    url: req.url
  });
});

app.get('/san-pham/:category?', _countdownHandler);
app.get('/giam-gia/:category?', _countdownHandler);
app.get('/bai-viet/:type?', _countdownHandler);
app.get('/lien-he', _countdownHandler);


/*
 * Start server
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

