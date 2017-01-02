require('babel-core/register');
var gulp = require('gulp');
var Server = require('karma').Server;
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var forever = require('gulp-forever-monitor');



// ============= test =============

gulp.task('test-front', function(){
	process.env.NODE_ENV = 'test';
	gulp.src('test/client/**/*.js')
		.pipe(babel())
		.pipe(mocha())
		.on('error', gutil.log)
});

gulp.task('test-front:watch', ['test-front'], function(){
  gulp.watch([
    'test/client/**/*.js',
		'dist/client/**/*'
  ], ['test-front']);
});

gulp.task('bt', function(){
	process.env.NODE_ENV = 'test';
  gulp.src('test/server/chat/*.js')
    .pipe(mocha())
    .on('error', gutil.log)
});

gulp.task('res', function(){
	process.env.NODE_ENV = 'test';
	gulp.src('test/server/chat/res.js')
	.pipe(mocha())
	.on('error', gutil.log)
});

gulp.task('wr', function(){
	gulp.watch([
		'test/server/chat/controller.spec.js',
		'src/server/chat/controller.js'
	], ['res']);
});

gulp.task('wbt', function(){
  gulp.watch([
    'test/server/chat/controller.spec.js',
    'src/server/chat/controller.js',
    'src/server/app.js'
  ], ['bt']);
});



// ============= prod and dev =============

gulp.task('nav-sass', function(){
  gulp.src('./src/client/style/nav.scss')
  .pipe(sass().on('error', gutil.log))
  .pipe(gulp.dest('./dist/client/style/nav.css'))
});

gulp.task('nav-sass:watch', ['nav-sass'], function(){
  livereload.listen();
  gulp.watch(['src/client/style/nav.scss'], ['nav-sass']);
});

gulp.task('babel', function(){
	return gulp.src('src/server/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/server'));
});

gulp.task('babel:watch', ['babel'], function(){
	gulp.watch(['src/server/**/*.js'], ['babel']);
});

gulp.task('html', function(){
	gulp.src('src/client/index.html')
		.pipe(gulp.dest('dist/client'));
});

gulp.task('html:watch', ['html'], function(){
	gulp.watch(['src/client/**/*.html'], ['html']);
});

gulp.task('server', ['nav-sass:watch', 'babel:watch'], function(){
	nodemon({
		script: 'dist/server/app.js',
		watch: ['dist/server/**/*'],
		env: {
			'NODE_ENV': 'dev'
		}
	})
});

gulp.task('server:debug', ['nav-sass:watch', 'babel:watch'], function(){
	return nodemon({
		script: 'dist/server/app.js',
		verbose: true,
		watch: ['dist/server/**/*'],
		env: {
			'NODE_ENV': 'dev'
		},
		exec: 'node --inspect'
	})
});

gulp.task('build-front', ['nav-sass', 'html']);
gulp.task('prod', ['babel']);

gulp.task('default', ['server']);
