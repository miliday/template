// ----------------------------------------------------------------------
// Starter markup template miliday - "Made with love, especially for you"
// ----------------------------------------------------------------------
// nickname: "Michael Holiday"
// organization: "Totonis.com"
// date: "21.11.2018"
// email: "mr.michael.holiday@gmail.com"
// ----------------------------------------------------------------------

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
const rename = require("gulp-rename");
const smartgrid = require('smart-grid');
const watch = require('gulp-watch');
const bulkSass = require('gulp-sass-bulk-import');

// smartgrid congig
const smartgridCongig = {
    outputStyle: 'sass',
    columns: 12,
    offset: '30px',
    mobileFirst: false,
    container: {
        maxWidth: '1170px',
        fields: '30px'
    },
    breakPoints: {
        lg: {
            width: '1100px',
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px'
        },
        xs: {
            width: '560px'
        }
    }
};


// server congig
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


// paths
let path = {
    src: {},
    dest: {}
};


// paths src
path.src.root = './src';
path.src.assets = {
    root: {},
    all: {},
}
path.src.assets.root = path.src.root + '/assets';
path.src.assets.all = path.src.assets.root + '/**/*';


path.src.pug = {
    root: '',
    all: '',
    compile: ''
};
path.src.pug.root = path.src.root + '/views';
path.src.pug.all = path.src.pug.root + '/**/*.pug';
path.src.pug.compile = path.src.pug.root + '/pages/**/*.pug';


path.src.sass = {
    root: '',
    all: '',
    ignore: ''
};
path.src.sass.root = path.src.assets.root + '/sass';
path.src.sass.all = path.src.sass.root + '/**/*.sass';
path.src.sass.ignore = '!' + path.src.sass.root + '/**/_*.sass';


path.src.js = {
    concat: '',
    root: '',
    combined: '',
    all: '',
    ignore: ''
};
path.src.js.concat = 'main.js';
path.src.js.root = path.src.assets.root + '/js';
path.src.js.combined = path.src.js.root + '/**/_*.js';
path.src.js.all = path.src.js.root + '/**/*.js';
path.src.js.ignore = '!' + path.src.js.combined;


path.src.img = {
    root: '',
    gif: '',
    svg: '',
    png: '',
    jpg: '',
    jpeg: '',
    all: ''
};
path.src.img.root = path.src.assets.root + '/img';
path.src.img.gif = path.src.img.root + '/**/*.gif';
path.src.img.svg = path.src.img.root + '/**/*.svg';
path.src.img.png = path.src.img.root + '/**/*.png';
path.src.img.jpg = path.src.img.root + '/**/*.jpg';
path.src.img.jpeg = path.src.img.root + '/**/*.jpeg';
path.src.img.all = [
    path.src.img.gif,
    path.src.img.svg,
    path.src.img.png,
    path.src.img.jpg,
    path.src.img.jpeg
];


// paths dest
path.dest.root = './dist';
path.dest.assets = path.dest.root + '/assets';
path.dest.html = path.dest.root;
path.dest.css = path.dest.assets + '/css';
path.dest.js = path.dest.assets + '/js';
path.dest.img = path.dest.assets + '/img';


// debug
gulp.task('test', function () {
    console.log(path);
    console.log('!' + path.dest.css + '/**/*.css');
});


// tasks global
gulp.task('default', ['clean'], function () {
    gulp.start('webserver');
    gulp.start('moving-assets-dev');
    gulp.start('pug-dev');
    gulp.start('sass-dev');
    gulp.start('js-independent-dev');
    gulp.start('js-combined-dev');
    gulp.start('assets-watcher-dev');
    gulp.start('pug-watcher-dev');
    gulp.start('sass-watcher-dev');
    gulp.start('js-combined-watcher-dev');
    gulp.start('js-independent-watcher-dev');
});


gulp.task('clean', function () {
    return gulp.src(path.dest.root)
        .pipe(clean())
})


gulp.task('webserver', function () {
    browserSync(serverConfig);
});


gulp.task('smart-grid', function () {
    smartgrid(path.src.sass.root, smartgridCongig);
    gulp.src(path.src.sass.root + '/smart-grid.' + smartgridCongig.outputStyle)
        .pipe(rename("_smartGrid." + smartgridCongig.outputStyle))
        .pipe(gulp.dest(path.src.sass.root));
    return gulp.src(path.src.sass.root + '/smart-grid.' + smartgridCongig.outputStyle)
        .pipe(clean())
});


// tasks watch
gulp.task('assets-watcher-dev', function () {
    return watch([path.src.assets.all, '!' + path.src.sass.all, '!' + path.src.js.all], function () {
        gulp.start('moving-assets-dev');
    })
});


gulp.task('sass-watcher-dev', function () {
    return watch(path.src.sass.all, function () {
        gulp.start('sass-dev');
    })
});


gulp.task('pug-watcher-dev', function () {
    return watch(path.src.pug.all, function () {
        gulp.start('pug-dev');
    })
});


gulp.task('js-combined-watcher-dev', function () {
    return watch(path.src.js.combined, function () {
        gulp.start('js-combined-dev');
    })
});


gulp.task('js-independent-watcher-dev', function () {
    return watch([path.src.js.all, path.src.js.ignore], function () {
        gulp.start('js-independent-dev');
    })
});


gulp.task('pug-dev', function () {
    return gulp.src(path.src.pug.compile)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.dest.html))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('sass-dev', function () {
    return gulp.src([path.src.sass.all, path.src.sass.ignore])
        .pipe(sourcemaps.init())
        .pipe(bulkSass())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('', {
            sourceMappingURLPrefix: ''
        }))
        .pipe(gulp.dest(path.dest.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('js-combined-dev', function () {
    return gulp.src(path.src.js.combined)
        .pipe(sourcemaps.init())
        .pipe(concat(path.src.js.concat))
        .pipe(sourcemaps.write('', {
            sourceMappingURLPrefix: ''
        }))
        .pipe(gulp.dest(path.dest.js))
        .pipe(browserSync.reload({
            stream: true
        }));
})


gulp.task('js-independent-dev', function () {
    return gulp.src([path.src.js.all, path.src.js.ignore])
        .pipe(gulp.dest(path.dest.js))
        .pipe(browserSync.reload({
            stream: true
        }));
})


gulp.task('clean-assets-dev', function () {
    return gulp.src([path.dest.assets + '/*', '!' + path.dest.css, '!' + path.dest.js])
        .pipe(clean({
            force: true
        }))
})


gulp.task('moving-assets-dev', ['clean-assets-dev'], function () {
    return gulp.src([path.src.assets.all, '!' + path.src.sass.all, '!' + path.src.js.all], {
            nodir: true
        })
        .pipe(gulp.dest(path.dest.assets))
        .pipe(browserSync.reload({
            stream: true
        }));
})


// tasks build
gulp.task('sass-build', function () {
    return gulp.src([path.src.sass.ignore, path.src.sass.all])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.dest.css));
});