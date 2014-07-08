var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs-extra');

var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var webpackCompiler = webpack(webpackConfig);

var gulp = require("gulp");
var gutil = require("gulp-util");
var plumber = require("gulp-plumber");
var changed = require("gulp-changed");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var jade = require("gulp-jade");
var connect = require("gulp-connect");
var prefix = require("gulp-autoprefixer");


gulp.task("compile-sass", function () {
    gulp.src("src/assets/css/*.scss")
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
            includePaths: ['src/assets/css','bower_components','bower_components/foundation/scss']
        }))
        .pipe(prefix())
        .pipe(gulp.dest("assets/css"))
        .pipe(connect.reload());
});

gulp.task("jsdoc", function (cb) {
    exec('node node_modules/jsdoc/jsdoc.js -c jsdoc.json', null, cb);
});

gulp.task("webpack", function (cb) {
    webpackCompiler.run(function (err, stats) {
        if (err) {
            new gutil.PluginError("webpack:build-dev", err);
        }
        cb();
    });
});

gulp.task("build-hammer", function (cb) {
    exec('npm install && grunt build', {
        cwd: 'node_modules/hammerjs/'
    }, function(err, stdout, stderr) {
        if (err || stderr) {
            new gutil.PluginError("build-hammer", err || stderr);
        } else {
            fs.copySync('./node_modules/hammerjs/hammer.js', './dist/hammer.js');
            fs.copySync('./node_modules/hammerjs/hammer.min.js', './dist/hammer.min.js');
            fs.copySync('./node_modules/hammerjs/hammer.min.map', './dist/hammer.min.map');
        }
        cb();
    });
});

gulp.task("compile-jade", function () {
    gulp.src(["src/**/*.jade", "!./src/inclusion/**/*.*"])
        .pipe(plumber())
        .pipe(jade({locals: require('./src/context')}))
        .pipe(gulp.dest(""))
        .pipe(connect.reload());
});

gulp.task("server", function () {
    connect.server({
        root: "",
        host: "0.0.0.0",
        port: 9000,
        livereload: true
    });
});

gulp.task("watch", function () {
    gulp.watch("src/assets/css/**/*", ["compile-sass"]);
    gulp.watch("src/assets/js/**/*", ["webpack"]);
    gulp.watch("src/**/*.jade", ["compile-jade"]);
});

gulp.task("default", ["server", "watch"]);
gulp.task("build-site", ["webpack", "compile-sass", "compile-jade", "jsdoc"]);
