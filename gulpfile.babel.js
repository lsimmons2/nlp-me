
require('babel-core/register');
import gulp from 'gulp'
const Server = require('karma').Server;
import sass from 'gulp-sass'
import livereload from 'gulp-livereload'
import gutil from 'gulp-util'
import mocha from 'gulp-mocha'
import babel from 'gulp-babel'
import nodemon from 'gulp-nodemon'
import forever from 'gulp-forever-monitor'
import webpack from 'webpack-stream'


// ============= test =============

gulp.task('test-front', () => {
	process.env.NODE_ENV = 'test';
	gulp.src('test/client/**/*.js')
		.pipe(babel())
		.pipe(mocha())
		.on('error', gutil.log)
});

gulp.task('test-front:watch', ['test-front'], () => {
  gulp.watch([
    'test/client/**/*.js',
		'dist/client/**/*'
  ], ['test-front']);
});

gulp.task('bt', () => {
	process.env.NODE_ENV = 'test';
  gulp.src('test/server/chat/*.js')
    .pipe(mocha())
    .on('error', gutil.log)
});

gulp.task('res', () => {
	process.env.NODE_ENV = 'test';
	gulp.src('test/server/chat/res.js')
	.pipe(mocha())
	.on('error', gutil.log)
});

gulp.task('wr', () => {
	gulp.watch([
		'test/server/chat/controller.spec.js',
		'src/server/chat/controller.js'
	], ['res']);
});

gulp.task('wbt', () => {
  gulp.watch([
    'test/server/chat/controller.spec.js',
    'src/server/chat/controller.js',
    'src/server/app.js'
  ], ['bt']);
});



// ============= prod and dev =============

gulp.task('nav-sass', () => {
  gulp.src('./src/client/style/nav.scss')
  .pipe(sass().on('error', gutil.log))
  .pipe(gulp.dest('./dist/client/style'))
});

gulp.task('nav-sass:watch', ['nav-sass'], () => {
  livereload.listen();
  gulp.watch(['src/client/style/nav.scss'], ['nav-sass']);
});

gulp.task('babel', () => {
	return gulp.src('src/server/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/server'));
});

gulp.task('babel:watch', ['babel'], () => {
	gulp.watch(['src/server/**/*.js'], ['babel']);
});

gulp.task('html', () => {
	gulp.src('src/client/index.html')
		.pipe(gulp.dest('dist/client'));
});

gulp.task('html:watch', ['html'], () => {
	gulp.watch(['src/client/index.html'], ['html']);
});

gulp.task('webpack', () => {
	return gulp.src('src/client/index.js')
		.pipe(webpack(require('./webpack.production.config.js')))
		.pipe(gulp.dest('dist/client'))
});

gulp.task('server', ['nav-sass:watch', 'babel:watch'], () => {
	nodemon({
		script: 'dist/server/app.js',
		watch: ['dist/server/**/*'],
		env: {
			'NODE_ENV': 'dev'
		}
	})
});

gulp.task('server:debug', ['nav-sass:watch', 'babel:watch'], () => {
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

gulp.task('build', ['nav-sass', 'html', 'webpack', 'babel']);

gulp.task('default', ['server']);
