/**
 *
 * ディレクトリ
 *
 ├── dist
 ├── gulpfile.babel.js
 ├── package.json
 └── src
 * @type {*|Gulp}
 */
const gulp = require('gulp'),
      docs = '.',
      distDir =  docs + '/dist',
      srcDir =  docs + '/src',
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant'),  // 圧縮率を高めるのにプラグインを入れる png
      mozjpeg = require('imagemin-mozjpeg'),  // 圧縮率を高めるのにプラグインを入れる jpg
      changed = require('gulp-changed'),
      notify = require('gulp-notify');
/**
 *
 * Compress and save the image.
 * Reload the browser.
 *
 * 画像を圧縮して保存。
 * ブラウザを再起動する。
 *
 */
gulp.task('images', () => {
  return gulp.src(srcDir + '/**/*.{png,jpg,gif,svg,JPG,jpeg}')
    .pipe(changed(distDir))  // src と dist を比較して異なるものだけ処理
    .pipe(imagemin([
      pngquant({
        quality: '65-80',  // 画質
        speed: 1,  // 最低のスピード
        floyd: 0,  // ディザリングなし
      }),
      mozjpeg({
        quality: 85, // 画質
        progressive: true
      }),
      imagemin.svgo(),
      imagemin.optipng(),
      imagemin.gifsicle()
    ]))
    .pipe(gulp.dest(distDir))  // 保存
    .pipe(notify('🍣 images task finished 🍣'));
});
