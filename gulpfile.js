// requires
const gulp = require('gulp');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const mediaGroup = require('gulp-group-css-media-queries');
const concat = require('gulp-concat');
const clean = require('gulp-clean');

// configs
const gulpConfig = {
    reload: true,
    sourcemaps: true
}

const serverConfig = {
    server: {
        baseDir: "dist"
    },
    ui: {
        port: 8088
    },
    notify: false,
    port: 8080,
    ghostMode: false,
    logPrefix: "miliday",
    host: "localhost",
    tunnel: "miliday-tunnel",
    open: "local"
};

// pathss
let paths = {src: {}, dest: {}};

// pathss src
paths.src.root = './src';
paths.src.assets = paths.src.root + '/assets';

paths.src.pug = {root: '',all: '', compile: ''};
paths.src.pug.root = paths.src.assets + '/views';
paths.src.pug.all = paths.src.pug.root + '/**/*.pug';
paths.src.pug.compile = paths.src.pug.root + '/pages/**/*.pug';

paths.src.scss = {root: '', all: '', ignore: ''};
paths.src.scss.root = paths.src.assets + '/{scss,sass}';
paths.src.scss.all = paths.src.scss.root + '/**/*.{sass,scss}';
paths.src.scss.ignore = '!' + paths.src.scss.root + '/**/_*.{sass,scss}';

paths.src.js = {root: '', all: '', ignore: ''};
paths.src.js.root = paths.src.assets + '/js',
paths.src.js.all = paths.src.js.root + '/**/*.js',
paths.src.js.ignore = '!' + paths.src.js.root + '/**/_*.js'

paths.src.imgs = {gif: '', svg: '', png: '', jpg: '', jpeg: ''}
paths.src.imgs.gif = paths.src.assets + '/**/*.gif',
paths.src.imgs.svg = paths.src.assets + '/**/*.svg',
paths.src.imgs.png = paths.src.assets + '/**/*.png',
paths.src.imgs.jpg = paths.src.assets + '/**/*.jpg',
paths.src.imgs.jpeg = paths.src.assets + '/**/*.jpeg'

paths.src.exceptions = [
    '!' + paths.src.pug.all,
    '!' + paths.src.scss.all,
    '!' + paths.src.js.all,
    '!' + paths.src.imgs.gif,
    '!' + paths.src.imgs.svg,
    '!' + paths.src.imgs.jpg,
    '!' + paths.src.imgs.jpeg
];
// all src files excluding processing
// paths.src.axp = [paths.src.root + '/**/*', paths.src.exceptions];

// pathss dest
paths.dest.root = './dist';
paths.dest.html = paths.dest.root;
paths.dest.assets = paths.dest.root + '/assets';
paths.dest.css = paths.dest.assets + '/css';
paths.dest.js = paths.dest.assets + '/js';

// // pathss watch
// paths.watch.pug = paths.src.pug.all;
// paths.watch.scss = paths.src.scss.all;
// paths.watch.js = paths.src.js.all;
// paths.watch.imgs = {
//     gif: paths.src.imgs.gif,
//     svg: paths.src.imgs.svg,
//     png: paths.src.imgs.png,
//     jpg: paths.src.imgs.jpg,
//     jpeg: paths.src.imgs.jpeg
// };
// paths.watch.exceptions = [
//     '!' + paths.watch.pug,
//     '!' + paths.watch.scss,
//     '!' + paths.watch.js,
//     '!' + paths.watch.imgs.gif,
//     '!' + paths.watch.imgs.svg,
//     '!' + paths.watch.imgs.jpg,
//     '!' + paths.watch.imgs.jpeg
// ]
// // all excluding processing
// paths.watch.axp = [paths.src.assets + '/**/*', paths.watch.exceptions];

// tasks
gulp.task('default', function () {
    console.log(paths)
});