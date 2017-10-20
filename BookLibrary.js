/**
 * Created by thulanisilinda on 8/31/17.
 */

var gzippo    = require('gzippo');
var  express     = require('express'),
  request     = require('request'),
  bodyParser  = require('body-parser'),
  log4js      = require('log4js'),
  app         = express();
var helmet    = require('helmet');
var string      =   require('string');



process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(helmet());

app.use(bodyParser.json({}));

var logger = log4js.getLogger('ROUTER');

app.use(log4js.connectLogger(logger, { level: 'auto' }));
app.use(express.static(__dirname + '/dist'));


app.listen(process.env.PORT || 8081);

