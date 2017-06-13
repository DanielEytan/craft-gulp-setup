var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var fs = require('fs');
var webpack = require('webpack-stream');
var imagemin = require('gulp-imagemin');

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

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./html/"
//         }
//     });
// });


// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    //watch files
    var files = [
    './html/css/styles.css'
    // './craft/templates/*.twig'
    ];
 
    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    proxy: "http://craft-gulp-setup.dev/",
    notify: false
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

gulp.task('images', function(){
  return gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('./html/images/'))
        // .pipe(reload({stream: true}));
});

gulp.task('images:watch', function () {
  return gulp.watch('./src/images/**/*.+(png|jpg|gif|svg)', gulp.series('images'));
});

gulp.task('default', gulp.series('images',  gulp.parallel('css', 'css:watch', 'js', 'js:watch', 'browser-sync')));



