var gulp = require('gulp');
var Server = require('karma').Server;
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');


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

gulp.task('sass', function(){
  gulp.src('./src/public/style/*.scss')
  .pipe(sass().on('error', gutil.log))
  .pipe(gulp.dest('./dist/public/style/'))
  .pipe(livereload());
});

gulp.task('ws', function(){
  livereload.listen();
  gulp.watch(['src/public/style/*.scss'], ['sass']);
});
