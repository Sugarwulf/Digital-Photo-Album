import * as mongoose from 'mongoose';
import Picture from './models/pictures';
import pictures from './api/picture';
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';

import routes from './routes/index';
import users from './routes/users';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));
app.use('/api/picture', pictures);

app.use('/', routes);
app.use('/users', users);

const connectionString: string = 'mongodb://Sugarwulf:Found43$@ds127982.mlab.com:27982/photos7137';
mongoose.connect(connectionString).then(() => {
  //add data
  mongoose.connection.db.dropDatabase(() => {
    Picture.create({
      filename: 'Introspective Pablo',
      description: 'Jace dressed as Pablo Escobar for Halloween.',
      ImageUrl: "https://cdn.filepicker.io/api/file/rvBjS6CQQMcDU5CdpQdn"
    }, {
      filename: 'Jace GQ',
      description: 'Jace in Puerto Penasco dressed for a wedding.',
      ImageUrl: "https://cdn.filepicker.io/api/file/LkOFpxTYiDfOW7BRR7gJ"
    }, {
      filename:'Bike Ride',
      description:'Jace learning to ride a bike that is inappropriate for his stature.',
      ImageUrl:"https://cdn.filepicker.io/api/file/SrtanvoQj21PKMordmRV"
    }).catch((err) => {
      console.error('Failed to seed pictures: ' + err.message);
      console.dir(err);
    });
  });
});


// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
