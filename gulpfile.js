var gulp = require('gulp'),
        runSequence = require('run-sequence'),
        clean = require('gulp-rimraf'),
        copy = require('gulp-copy'),
        less = require('gulp-less'),
        concat = require('gulp-concat'),
        jshint = require('gulp-jshint'),
        autoprefixer = require('gulp-autoprefixer'),
        minifyCss = require('gulp-minify-css'),
        uglify = require('gulp-uglify'),
        watch = require('gulp-watch'),
        builder = require('gulp-nw-builder');

/*
 * Clear
 */
gulp.task('clean:css', function () {
    return gulp.src('./_dev/css/*.css', {read: false}).pipe(clean());
});
gulp.task('clean:js', function () {
    return gulp.src([
        './_dev/js/all.js',
        './_dev/js/bootstrap.js',
        './_dev/js/jquery.js'
    ], {read: false}).pipe(clean());
});
gulp.task('clean:build:css', function () {
    return gulp.src('./_dev/build/*.css', {read: false}).pipe(clean());
});
gulp.task('clean:build:js', function () {
    return gulp.src('./_dev/build/*.js', {read: false}).pipe(clean());
});
gulp.task('clean:minify:css', function () {
    return gulp.src('./css/*.css', {read: false}).pipe(clean());
});
gulp.task('clean:minify:js', function () {
    return gulp.src('./js/*.js', {read: false}).pipe(clean());
});
gulp.task('clean:minify', ['clean:minify:css', 'clean:minify:js']);
gulp.task('clean:build', ['clean:build:css', 'clean:build:js']);
gulp.task('clean', ['clean:css', 'clean:js', 'clean:minify', 'clean:build']);

/*
 * Bower copy
 */
gulp.task('bower:css', function () {
    return gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css')
            .pipe(copy('./_dev/css', {prefix: 5}));
});
gulp.task('bower:js', function () {
    return gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/bootstrap/dist/js/bootstrap.js'
    ]).pipe(copy('./_dev/js', {prefix: 5}));
});
gulp.task('bower', ['bower:css', 'bower:js']);

/*
 * Less
 */
gulp.task('less', function () {
    return gulp.src('./_dev/css/*.less')
            .pipe(less())
            .pipe(gulp.dest('./_dev/css'));
});

/*
 * Auto prefixer
 */
gulp.task('prefix', function () {
    return gulp.src('./_dev/css/style.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })).pipe(gulp.dest('./_dev/css'));
});

/*
 * Concat site CSS & JS
 */
// CSS
gulp.task('concat:css', function () {
    return gulp.src([
        './_dev/css/bootstrap.css',
        './_dev/css/style.css'
    ]).pipe(concat('style.min.css')).pipe(gulp.dest('./_dev/build'));
});
// JS
gulp.task('concat:js', function () {
    return gulp.src([
        './_dev/js/jquery.js',
        './_dev/js/bootstrap.js',
        './_dev/js/script.js'
    ]).pipe(concat('script.min.js')).pipe(gulp.dest('./_dev/build'));
});
gulp.task('concat', ['concat:css', 'concat:js']);

/*
 * Minify CSS & JS
 */
// CSS
gulp.task('minify:css', function () {
    return gulp.src('./_dev/build/*.css')
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(gulp.dest('./css'));
});
// JS
gulp.task('minify:js', function () {
    return gulp.src('./_dev/build/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('./js'));
});
gulp.task('minify', ['minify:css', 'minify:js']);

/*
 * JS Hint
 */
gulp.task('jshint', function () {
    return gulp.src([
        './_dev/js/script.js',
        './gulpfile.js'
    ]).pipe(jshint()).pipe(jshint.reporter('default'));
});

/*
 * Default task
 */
gulp.task('default', function (callback) {
    runSequence('clean', 'bower', 'less', 'prefix', 'concat', 'minify', 'jshint', callback);
});

/*
 * Watch
 */
gulp.task('watch', function () {
    gulp.watch('./_dev/css/style.less', ['less']);
    gulp.watch('./_dev/css/style.css', ['concat:css']);
    gulp.watch('./_dev/js/script.js', ['concat:js']);
    gulp.watch('./_dev/build/*.js', ['minify:js']);
    gulp.watch('./_dev/build/*.css', ['minify:css']);
});

/*
 * NW Build
 */
gulp.task('nw-build', function () {
    return gulp.src([
        './*',
        './css/**/*',
        './js/**/*',
        './img/**/*'
    ]).pipe(builder({
        version: 'v0.12.3',
        platforms: ['win', 'osx', 'linux']
    }));
});
gulp.task('build', function (callback) {
    runSequence('default', 'nw-build', callback);
});