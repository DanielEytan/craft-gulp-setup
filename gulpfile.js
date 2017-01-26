var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var fs = require('fs');

 gulp.task('clean', function () {
    return gulp.src('./dist/*', {read: false})
        .pipe(clean());
});

gulp.task('templates', function () {
    'use strict';
    var twig = require('gulp-twig');
    var contentde = JSON.parse(fs.readFileSync('./content/de.json', 'utf8'));
    console.log(contentde);
    return gulp.src('./src/templates/**/*.twig')
        .pipe(twig({
            data: contentde
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

gulp.task('templates:watch', function () {
  return gulp.watch('./src/templates/**/*.twig', gulp.series('templates'));
});

gulp.task('css', function () {
  return gulp.src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('css:watch', function () {
  return gulp.watch('./src/css/**/*.scss', gulp.series('css'));
});

gulp.task('content:watch', function () {
  return gulp.watch('./content/**/*.json', gulp.series('templates'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('default', gulp.series('clean', gulp.parallel('browser-sync', 'templates', 'css', 'css:watch', 'templates:watch', 'content:watch')));



