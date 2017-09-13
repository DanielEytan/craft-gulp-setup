var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var fs = require('fs');
var webpack = require('webpack-stream');

gulp.task('css', function () {
  return gulp.src('./src/css/**/*.scss')
    .pipe(sass({
      // includePaths: require('node-reset-scss').includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./html/css'))
    .pipe(browserSync.stream({stream: true}));
});

gulp.task('css:watch', function () {
  return gulp.watch('./src/css/**/*.scss', gulp.series('css'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'example.dev',
        /*server: {
            baseDir: "./html/",
        }*/
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
    .pipe(gulp.dest('html/js/'))
    .pipe(browserSync.stream({stream: true}));
});

gulp.task('js:watch', function () {
  return gulp.watch('./src/js/*.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('browser-sync', 'css', 'css:watch', 'js', 'js:watch'));



