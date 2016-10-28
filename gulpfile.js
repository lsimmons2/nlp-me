var gulp = require('gulp');
var Server = require('karma').Server;

gulp.task('ft', function(done){
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('wft', function(){
  gulp.watch([
    'test/public/apiSearchCtrl.spec.js',
    'src/public/controllers/apiSearchCtrl.js'
  ], ['ft']);
});
