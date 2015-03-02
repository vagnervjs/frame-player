var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	del = require('del');

var paths = {
	build: ['dist'],
	scripts: ['src/js/libs/*.js', 'src/js/*.js'],
	styles: ['src/css/**/*.css']
};

gulp.task('clean', function(cb) {
  del(paths.build, cb);
});

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest(paths.build[0]));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
		.pipe(cssmin())
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest(paths.build[0]));
});

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

// Build
gulp.task('default', ['clean', 'scripts', 'styles']);
