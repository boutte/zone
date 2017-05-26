var gulp   = require('gulp');
var fs     = require('fs');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');


gulp.task('css', function() {

  return gulp.src('./assets/scss/style.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss([ autoprefixer() ]))
    .pipe($.rename('style.css'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe($.rename('style.min.css'))
    .pipe($.cssmin())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src('assets/images/*.{jpg,gif,png,svg}')
    .pipe($.image())
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', [ 'serve' ]);

gulp.task('serve', ['css','images','html'], function() {

  browserSync.init({
    browser: "google chrome",
    ghostMode: false,
    server: {
      baseDir: "./dist/"
    }
  });

  gulp.watch('style.scss', ['css']);
  gulp.watch('assets/scss/*.scss', ['css']);
  gulp.watch('assets/images/*.{jpg,gif,png,svg}', ['images']).on('change', browserSync.reload);
  gulp.watch("./*.html", ['html']).on('change', browserSync.reload);

});
