'use strict';

// gulpを読み込む
var gulp = require('gulp');
// gulp-jadeを読み込む
var jade = require('gulp-jade');
// SCSSコンパイル用
var sass = require('gulp-sass');
// ファイル監視用
var watch = require('gulp-watch');
// リロード用
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Webサーバー兼リロード
gulp.task('server', function() {
  browserSync({
    notify: false,
    server: {
      baseDir: './app/'
    }
  });

  // jadeがコンパイルされたらリロード
  gulp.watch('./app/*.html', reload);
  // scssがコンパイルしたらリロード
  gulp.watch('./app/styles/*.css', ['sass']);
});

// jadeコンパイル用タスク
gulp.task('jade', function() {
  // タスクを実行するファイルを指定
  gulp.src('./app/jade/*.jade')
    // 実行する処理をpipeでつないでいく
    .pipe(watch('./app/jade/*.jade')) // 変更したら実行
    .pipe(jade()) // jadeへコンパイル
    .pipe(gulp.dest('./app/')); //コンパイル先を指定
});

// scssコンパイル用タスク
gulp.task('sass', function() {
  // タスクを実行するファイルを指定
  gulp.src('./app/styles/*.scss')
    .pipe(sass()) // モジュールを実行
    .pipe(gulp.dest('./app/styles/'));
});

// タスクを並列実行
gulp.task('default', ['server', 'jade', 'sass']);

// watchしてタスクを実行とか出来る