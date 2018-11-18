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
const modeSass = 'scss';

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
    all: '',
    ignore: ''
};
paths.src.pug.all = paths.src.root + '/**/*.pug';
paths.src.pug.ignore = paths.src.root + '/**/_*.pug';

paths.src.sass = {
    all: '',
    ignore: ''
};
paths.src.sass.all = paths.src.root + '/**/*.' + modeSass;
paths.src.sass.ignore = '!' + paths.src.root + '/**/_*.' + modeSass;

paths.src.js = {
    concat: '',
    path: '',
    root: '',
    all: '',
    ignore: ''
};
paths.src.js.concat = 'main.js';
paths.src.js.path = '/assets/js';
paths.src.js.root = paths.src.root + '/assets/js';
paths.src.js.all = paths.src.js.root + '/**/*.js';
paths.src.js.ignore = '!' + paths.src.js.root;

paths.src.imgs = {
    gif: '',
    svg: '',
    png: '',
    jpg: '',
    jpeg: ''
}
paths.src.imgs.gif = paths.src.root + '/**/*.gif',
    paths.src.imgs.svg = paths.src.root + '/**/*.svg',
    paths.src.imgs.png = paths.src.root + '/**/*.png',
    paths.src.imgs.jpg = paths.src.root + '/**/*.jpg',
    paths.src.imgs.jpeg = paths.src.root + '/**/*.jpeg'

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
paths.dest.html = paths.dest.root;
paths.dest.css = paths.dest.root;
paths.dest.js = paths.dest.root + paths.src.js.path;

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
gulp.task('default', ['webserver', 'sass-dev', 'js-dev']);

gulp.task('watcher', function () {
    gulp.watch(paths.src.sass.all, ['sass-dev']);
    gulp.watch(paths.src.sass.all, ['js-dev']);
});


gulp.task('pug-dev', function () {
    return gulp.src([paths.src.pug.all, paths.src.pug.ignore])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(paths.dest.html))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass-dev', function () {
    return gulp.src([paths.src.sass.all, paths.src.sass.ignore])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('', {
            sourceMappingURLPrefix: ''
        }))
        .pipe(gulp.dest(paths.dest.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js-dev', function () {
    return gulp.src(paths.src.js.all)
        .pipe(sourcemaps.init())
        .pipe(concat(paths.src.js.concat))
        .pipe(sourcemaps.write('', {
            sourceMappingURLPrefix: ''
        }))
        .pipe(gulp.dest(paths.dest.js))
})

// tasks build

gulp.task('sass-build', function () {
    return gulp.src([paths.src.sass.all, paths.src.sass.ignore])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dest.css));
});