var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var fs = require('fs');
var webpack = require('webpack-stream');
var imagemin = require('gulp-imagemin');

 gulp.task('clean', function () {
    return gulp.src('./dist/*', {read: false})
        .pipe(clean());
});

gulp.task('templates', function () {
    'use strict';
    var twig = require('gulp-twig');
    var contentde = JSON.parse(fs.readFileSync('./content/de.json', 'utf8'));
    return gulp.src('./src/templates/**/*.twig')
        .pipe(twig({
            data: contentde
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream({stream: true}));
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
    .pipe(browserSync.stream({stream: true}));
});

gulp.task('css:watch', function () {
  return gulp.watch('./src/css/**/*.scss', gulp.series('css'));
});

gulp.task('content:watch', function () {
  return gulp.watch('./content/**/*.json', gulp.series('templates'));
});

gulp.task('images:watch', function () {
  return gulp.watch('./src/images/**/*.+(png|jpg|gif|svg)', gulp.series('images'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(webpack({
      output: {
        filename: 'main.js'
      },
      resolve: {
          // Makes sure the compiler looks for modules in /src and node_modules
          modulesDirectories: ['./src/js', 'node_modules']
        }
    }))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.stream({stream: true}));
});

gulp.task('js:watch', function () {
  return gulp.watch('./src/js/*.js', gulp.series('js'));
});

gulp.task('images', function(){
  return gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'))
        // .pipe(reload({stream: true}));
});


gulp.task('default', gulp.series('clean', gulp.parallel('browser-sync', 'templates', 'css', 'css:watch', 'templates:watch', 'content:watch', 'js', 'js:watch', 'images')));



