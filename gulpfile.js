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

gulp.task('ft', function(done){
	process.env.NODE_ENV = 'test';
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

gulp.task('debug', ['watch-html', 'watch-babel'], function(){
	return nodemon({
		nodeArgs: ['--inspect'],
		script: 'dist/server/app.js',
		verbose: true,
		ignore: ['test/**', 'node_modules/**', 'dist/**'],
		env: {
			'NODE_ENV': 'dev'
		}
	})
});



// ============= prod and dev =============

gulp.task('sass', function(){
  gulp.src('./src/public/style/*.scss')
  .pipe(sass().on('error', gutil.log))
  .pipe(gulp.dest('./dist/public/style/'))
  .pipe(livereload());
});

gulp.task('watch-sass', ['sass'], function(){
  livereload.listen();
  gulp.watch(['src/public/style/*.scss'], ['sass']);
});

// gulp.task('babel', function(){
// 	return gulp.src('src/**/*.js')
// 		.pipe(babel({
// 			presets: ['es2015']
// 		}))
// 		.pipe(gulp.dest('dist/'));
// });

// gulp.task('watch-babel', ['babel'], function(){
// 	gulp.watch(['src/**/*.js'], ['babel']);
// 	gulp.watch(['src/public/**/*.js'], ['babel']);
// });


gulp.task('html', function(){
	gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('watch-html', ['html'], function(){
	gulp.watch(['src/public/**/*.html'], ['html']);
});

gulp.task('dev', function(){
	return nodemon({
		script: 'dist/server/app.js',
		verbose: true,
		ignore: ['test/**', 'node_modules/**', 'logs/**', 'src/**'],
		env: {
			'NODE_ENV': 'dev'
		}
	})
});

// gulp.task('dev', ['watch-sass', 'watch-html', 'watch-babel'], function(){
// 	return nodemon({
// 		script: 'dist/server/app.js',
// 		verbose: true,
// 		ignore: ['test/**', 'node_modules/**', 'dist/**', 'logs/**'],
// 		env: {
// 			'NODE_ENV': 'dev'
// 		}
// 	})
// });

gulp.task('prod', ['sass', 'html', 'babel']);
