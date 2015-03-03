var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	del = require('del');

var paths = {
	prefix: 'frameplayer.min',
	build: 'dist',
	js: ['src/*.js'],
	css: ['src/*.css']
};

gulp.task('clean', function(cb) {
  del(paths.build, cb);
});

gulp.task('js', function() {
	return gulp.src(paths.js)
		.pipe(uglify())
		.pipe(concat(paths.prefix + '.js'))
		.pipe(gulp.dest(paths.build));
});

gulp.task('css', function() {
    return gulp.src(paths.css)
		.pipe(cssmin())
		.pipe(concat(paths.prefix +  '.css'))
		.pipe(gulp.dest(paths.build));
});

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.styles, ['css']);
});

// Build
gulp.task('default', ['clean', 'js', 'css']);
