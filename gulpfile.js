// requires
const gulp = require('gulp-param')(require('gulp'), process.argv);
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
const pug = require('gulp-pug');
const clean = require('gulp-clean');

// configs
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
let paths = {
    src: {},
    dest: {}
};

// pathss src
paths.src.root = './src';
paths.src.assets = paths.src.root + '/assets';

paths.src.pug = {
    root: '',
    all: '',
    compile: ''
};
paths.src.pug.root = paths.src.root + '/views';
paths.src.pug.all = paths.src.pug.root + '/**/*.pug';
paths.src.pug.compile = paths.src.pug.root + '/pages/**/*.pug';

paths.src.sass = {
    root: '',
    all: '',
    ignore: ''
};
paths.src.sass.root = paths.src.assets + '/sass';
paths.src.sass.all = paths.src.sass.root + '/**/*.sass';
paths.src.sass.ignore = '!' + paths.src.sass.root + '/**/_*.sass';

paths.src.js = {
    concat: '',
    root: '',
    combined: '',
    all: '',
    ignore: ''
};
paths.src.js.concat = 'main.js';
paths.src.js.root = paths.src.assets + '/js';
paths.src.js.combined = paths.src.js.root + '/**/_*.js';
paths.src.js.all = paths.src.js.root + '/**/*.js';
paths.src.js.ignore = '!' + paths.src.js.combined;

paths.src.imgs = {
    root: '',
    gif: '',
    svg: '',
    png: '',
    jpg: '',
    jpeg: ''
};
paths.src.imgs.root = paths.src.assets + '/img';
paths.src.imgs.gif = paths.src.imgs.root + '/**/*.gif';
paths.src.imgs.svg = paths.src.imgs.root + '/**/*.svg';
paths.src.imgs.png = paths.src.imgs.root + '/**/*.png';
paths.src.imgs.jpg = paths.src.imgs.root + '/**/*.jpg';
paths.src.imgs.jpeg = paths.src.imgs.root + '/**/*.jpeg';

paths.src.exceptions = [
    '!' + paths.src.pug.all,
    '!' + paths.src.sass.all,
    '!' + paths.src.js.all,
    '!' + paths.src.imgs.gif,
    '!' + paths.src.imgs.svg,
    '!' + paths.src.imgs.jpg,
    '!' + paths.src.imgs.jpeg
];

// pathss dest
paths.dest.root = './dist';
paths.dest.assets = paths.dest.root + '/assets';
paths.dest.html = paths.dest.root;
paths.dest.css = paths.dest.assets + '/css';
paths.dest.js = paths.dest.assets + '/js';
paths.dest.img = paths.dest.assets + '/img';

// tasks global

gulp.task('clean', function () {
    return gulp.src(paths.dest.root)
        .pipe(clean())
})

gulp.task('clean-js', function () {
    return gulp.src(paths.dest.js)
        .pipe(clean())
})

gulp.task('webserver', function () {
    browserSync(serverConfig);
});

// tasks watch
gulp.task('default', ['pug-dev', 'sass-dev', 'js-dev'], function() {
    gulp.start('watcher');
    gulp.start('webserver');
});

gulp.task('watcher', function () {
    gulp.watch(paths.src.sass.all, ['sass-dev']);
    gulp.watch(paths.src.js.all, ['js-dev']);
    gulp.watch(paths.src.pug.all, ['pug-dev']);
});


gulp.task('pug-dev', function () {
    return gulp.src(paths.src.pug.compile)
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest(paths.dest.html))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass-dev', function () {
    return gulp.src([paths.src.sass.all, paths.src.sass.ignore])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error',sass.logError))
        .pipe(sourcemaps.write('',{sourceMappingURLPrefix:''}))
        .pipe(gulp.dest(paths.dest.css))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js-dev', function () {
    return gulp.src(paths.src.js.all)
        .pipe(sourcemaps.init())
        .pipe(concat(paths.src.js.concat))
        .pipe(sourcemaps.write('',{sourceMappingURLPrefix: ''}))
        .pipe(gulp.dest(paths.dest.js))
})

// tasks build

gulp.task('sass-build', function () {
    return gulp.src([paths.src.sass.all, paths.src.sass.ignore])
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest(paths.dest.css));
});