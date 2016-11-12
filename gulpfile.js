var gulp = require('gulp');
var Server = require('karma').Server;
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');


gulp.task('set-test-env', function(){
	return process.env.NODE_ENV = 'test';
});

gulp.task('ft', function(done){
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('wft', function(){
  gulp.watch([
    'test/public/chatCtrl.spec.js',
		'test/public/service.js',
    'karma.conf.js',
    'src/public/controllers/chatCtrl.js'
  ], ['ft']);
});

gulp.task('bt', ['set-test-env'], function(){
  gulp.src('test/server/chat/*.js')
    .pipe(mocha())
    .on('error', gutil.log)
});

gulp.task('res', ['set-test-env'], function(){
	gulp.src('test/server/chat/res.js')
	.pipe(mocha())
	.on('error', gutil.log)
});

gulp.task('wr', function(){
	gulp.watch([
		'test/server/chat/res.js',
		'src/server/chat/controller.js'
	], ['res']);
});

gulp.task('wbt', function(){
  gulp.watch([
    'test/server/chat/controller.js',
    'src/server/chat/controller.js',
    'src/server/app.js'
  ], ['bt']);
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
