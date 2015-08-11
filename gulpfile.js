'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');

// browsersyncによるリロード
gulp.task('reload', function() {
  browserSync.reload();
});

// 静的サーバーの立ち上げとファイルの監視
// 同時にsassとjadeをコンパイル
gulp.task('default', ['sass', 'jade'], function() {

  browserSync.init({
    server: './app'
  });

  // 監視対象
  gulp.watch('app/styles/*.scss', ['sass']);
  gulp.watch('app/jade/*.jade', ['jade']);
  gulp.watch('app/scripts/**.js', ['concat']);
  gulp.watch('app/main.js', ['reload']);
  gulp.watch('app/*.html', ['reload']);
});

// concat(jsの結合)
gulp.task('concat', function() {
  return gulp.src('./app/scripts/**.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./app'))
    .pipe(notify('jsを結合しました。'));
});

// scss
gulp.task('sass', function() {
  return gulp.src('app/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/styles'))
    .pipe(browserSync.stream());
});

// jade
gulp.task('jade', function() {
  return gulp.src('app/jade/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('app/'));
});

// lint
gulp.task('lint', function() {
  return gulp.src('./app/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});