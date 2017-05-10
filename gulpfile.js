'use strict';

var gulp = require('gulp');
var pkg = require('./package.json');
var uglify = require("gulp-uglify");
var replace = require('gulp-replace');
var include = require("gulp-include");
var concat = require("gulp-concat");
var header = require("gulp-header");
var size = require("gulp-size");

var comment = `/**
 * Sled v${pkg.version}
 * Copyright 2017 Kabir Shah
 * Released under the MIT License
 */\r\n`;

gulp.task('build', function () {
  return gulp.src(['./src/wrapper.js'])
    .pipe(include())
    .pipe(concat('sled.js'))
    .pipe(header(comment + '\n'))
    .pipe(replace('__VERSION__', pkg.version))
    .pipe(size())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', ['build'], function() {
  return gulp.src(['./dist/sled.js'])
    .pipe(uglify())
    .pipe(header(comment))
    .pipe(size())
    .pipe(size({
      gzip: true
    }))
    .pipe(concat('sled.min.js'))
    .pipe(gulp.dest('./dist/'));
});

// Default task
gulp.task('default', ['build', 'minify']);
