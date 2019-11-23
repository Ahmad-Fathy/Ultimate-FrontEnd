var gulp          = require('gulp'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-sass'),
    autoprefix    = require('gulp-autoprefixer'),
    pug           = require('gulp-pug'),
    livereload    = require('gulp-livereload'),
    sourcemaps    = require('gulp-sourcemaps'),
    notify        = require('gulp-notify'),
    minify        = require('gulp-minify'),
    newer         = require('gulp-newer');

// Html Task
    gulp.task('html', function() {
        return gulp.src('stage/html/*.pug')
                .pipe(pug({pretty: true}))
                .pipe(gulp.dest('dist'))
                .pipe(livereload())
    });

// Css Task
    gulp.task('css', function() {
        return gulp.src(['stage/css/**/*.css', 'stage/css/**/*.scss'])
                .pipe(sourcemaps.init())
                .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
                .pipe(autoprefix())
                .pipe(newer('stage/css/**/*.scss'))
                .pipe(concat('style.css'))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('dist/css'))
                .pipe(livereload())
    });

// Js Task
    gulp.task('js', function() {
        return gulp.src('stage/js/*.js')
                .pipe(concat('main.js'))
                .pipe(minify())
                .pipe(gulp.dest('dist/js'))
                .pipe(livereload())
    });

// watch
    gulp.task('watch', function() {
        require('./server.js');
        livereload.listen();
        gulp.watch('stage/html/**/*.pug', ['html']);
        gulp.watch(['stage/css/**/*.css', 'stage/css/**/*.scss'], ['css']);
        gulp.watch('stage/js/*.js', ['js']);
    });