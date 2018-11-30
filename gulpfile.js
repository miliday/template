// ----------------------------------------------------------------------
// Starter markup template miliday - "Made with love, especially for you"
// ----------------------------------------------------------------------
// nickname: "Michael Holiday"
// organization: "Totonis.com"
// date: "21.11.2018"
// email: "mr.michael.holiday@gmail.com"
// ----------------------------------------------------------------------


// requires
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gulpIgnore = require('gulp-ignore');
const gulpSequence = require('gulp-sequence');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const bulkSass = require('gulp-sass-bulk-import');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const mediaGroup = require('gulp-group-css-media-queries');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const pugIncludeGlob = require('pug-include-glob');
const clean = require('gulp-clean');
const rename = require("gulp-rename");
const smartgrid = require('smart-grid');
const watch = require('gulp-watch');
const yargs = require('yargs');


// Gulp config
var gulpConfig = {
    params: yargs.argv,
    reload: yargs.argv.nr ? false : true,
    sourcemaps: {
        css: yargs.argv.dev ? true : false,
        js: yargs.argv.dev ? true : false
    },
    minifying: {
        css: yargs.argv.prod ? true : false,
        js: yargs.argv.prod ? true : false,
        html: yargs.argv.prod ? false : false,
    }
}

// smartgrid congig
var smartgridCongig = {
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
var serverConfig = {
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
var path = {
    src: {},
    dest: {},
    exclude: {}
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
path.dest.assets = {
    root: '',
    all: '',
    ignore: {
        css: '',
        js: '',
        gif: '',
        svg: '',
        png: '',
        jpg: '',
        jpeg: '',
    }
};
path.dest.assets.root = path.dest.root + '/assets';
path.dest.assets.all = path.dest.assets.root + '/**/*';
path.dest.html = path.dest.root;
path.dest.css = path.dest.assets.root + '/css';
path.dest.js = path.dest.assets.root + '/js';
path.dest.img = path.dest.assets.root + '/img';

path.exclude = {
    sass: '**/sass/**/*.sass',
    js: {
        all: '**/js/**/*.js',
        map: '**/js/**/*.map',
    },
    gif: '**/img/**/*.gif',
    svg: '**/img/**/*.svg',
    png: '**/img/**/*.png',
    jpg: '**/img/**/*.jpg',
    jpeg: '**/img/**/*.jpeg',
};


// main task
gulp.task('default', function (cb) {
    if (gulpConfig.params.dev) {
        gulpSequence(['clean'], ['build'], ['watcher', 'server'], cb);
    } else if (gulpConfig.params.prod) {
        gulpSequence(['clean'], ['build'], cb);
    } else {
        gulp.start('helping')
    }
});


gulp.task('helping', function () {
    console.log();
    console.error('------------------------------------------');
    console.error('You need to select the project build mode!');
    console.error('------------------------------------------');
    console.error('use "--dev" to build in development mode');
    console.error('use "--prod" to build in production mode');
    console.log();
    console.warn('-----------------------------------------');
    console.warn('Additional commands for development mode:');
    console.warn('-----------------------------------------');
    console.warn('"--nr" to disable reloading page when changes');
    console.log();
})


// tasks global
gulp.task('clean', function () {
    if (gulpConfig.params.dev && !gulpConfig.params.prod) {
        return gulp.src(path.dest.root, {
                read: false
            })
            .pipe(clean());
    } else {
        console.error('Select build mode: --dev');
    }
});


gulp.task('clean:assets', function () {
    return gulp.src([path.dest.assets.root + '/*', '!' + path.dest.css, '!' + path.dest.js], {read: false})
        .pipe(clean());
});


gulp.task('smartgrid:init', function () {
    smartgrid(path.src.sass.root, smartgridCongig);
});


gulp.task('smartgrid:rename', function () {
    return gulp.src(path.src.sass.root + '/smart-grid.' + smartgridCongig.outputStyle)
        .pipe(rename("_smartGrid." + smartgridCongig.outputStyle))
        .pipe(gulp.dest(path.src.sass.root));
});


gulp.task('clean:smartgrid', function () {
    return gulp.src(path.src.sass.root + '/smart-grid.' + smartgridCongig.outputStyle)
        .pipe(clean());
});


gulp.task('smartgrid', function (cb) {
    gulpSequence(['smartgrid:init', 'smartgrid:rename'], 'clean:smartgrid', cb)
});



gulp.task('server', function () {
    browserSync(serverConfig);
});


gulp.task('build', function (cb) {
    if (gulpConfig.params.dev && !gulpConfig.params.prod) {
        gulpSequence('assets', 'pug', 'sass', 'js', cb);
    } else if (!gulpConfig.params.dev && gulpConfig.params.prod) {
        gulpSequence('assets', 'img', 'pug', 'sass', 'js', cb);
    } else {
        console.error('Select build mode: --dev or --prod');
    }
});


gulp.task('watcher', function (cb) {
    if (gulpConfig.params.dev && !gulpConfig.params.prod) {
        gulpSequence(['watcher:pug', 'watcher:sass', 'watcher:js:combined', 'watcher:js:independent', 'watcher:assets'], cb);
    } else {
        console.error('Select build mode: --dev');
    }
});


// watcher tasks development
gulp.task('watcher:assets', function () {
    if (gulpConfig.params.dev && !gulpConfig.params.prod) {
        return watch([path.src.assets.all, '!' + path.src.sass.all, '!' + path.src.js.all], function (event) {
            gulpSequence('clean:assets', 'assets')(function (err) {
                if (err) console.log(err)
            })
        });
    } else {
        console.error('Select build mode: --dev');
    }
});


gulp.task('watcher:sass', function () {
    if (gulpConfig.params.dev && !gulpConfig.params.prod) {
        return watch(path.src.sass.all, function () {
            gulp.start('sass');
        });
    } else {
        console.error('Select build mode: --dev');
    }
});


gulp.task('watcher:pug', function () {
    if (gulpConfig.params.dev && !gulpConfig.params.prod) {
        return watch(path.src.pug.all, function () {
            gulp.start('pug');
        });
    } else {
        console.error('Select build mode: --dev');
    }
});


gulp.task('watcher:js:combined', function () {
    if (gulpConfig.params.dev && !gulpConfig.params.prod) {
        return watch(path.src.js.combined, function () {
            gulp.start('js:combined');
        });
    } else {
        console.error('Select build mode: --dev');
    }
});


gulp.task('watcher:js:independent', function () {
    if (gulpConfig.params.dev && !gulpConfig.params.prod) {
        return watch([path.src.js.all, path.src.js.ignore], function () {
            gulp.start('js:independent');
        });
    } else {
        console.error('Select build mode: --dev');
    }
});


// tasks build development
gulp.task('pug', function () {
    if ((gulpConfig.params.dev && !gulpConfig.params.prod) || (!gulpConfig.params.dev && gulpConfig.params.prod)) {
        return gulp.src(path.src.pug.compile)
            .pipe(pug({
                pretty: true,
                plugins: [pugIncludeGlob()]
            }))
            .pipe(gulpif(gulpConfig.minifying.html, htmlmin({
                collapseWhitespace: true
            })))
            .pipe(gulp.dest(path.dest.html))
            .pipe(gulpif(gulpConfig.reload, browserSync.stream()));
    } else {
        console.error('Select build mode: --dev or --prod');
    }
});


gulp.task('sass', function () {
    if ((gulpConfig.params.dev && !gulpConfig.params.prod) || (!gulpConfig.params.dev && gulpConfig.params.prod)) {
        return gulp.src([path.src.sass.all, path.src.sass.ignore])
            .pipe(gulpif(gulpConfig.sourcemaps.css, sourcemaps.init()))
            .pipe(bulkSass())
            .pipe(sass().on('error', sass.logError))
            .pipe(gulpif(gulpConfig.params.prod, autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })))
            .pipe(gulpif(gulpConfig.params.prod, mediaGroup()))
            .pipe(gulpif(gulpConfig.minifying.css, csso()))
            .pipe(gulpif(gulpConfig.sourcemaps.css, sourcemaps.write('', {
                sourceMappingURLPrefix: ''
            })))
            .pipe(gulp.dest(path.dest.css))
            .pipe(gulpif(gulpConfig.reload, browserSync.stream()));
    } else {
        console.error('Select build mode: --dev or --prod');
    }
});


gulp.task('js:combined', function () {
    if ((gulpConfig.params.dev && !gulpConfig.params.prod) || (!gulpConfig.params.dev && gulpConfig.params.prod)) {   
        return gulp.src(path.src.js.combined)
            .pipe(gulpif(gulpConfig.sourcemaps.js, sourcemaps.init()))
            .pipe(concat(path.src.js.concat))
            .pipe(gulpif(gulpConfig.params.prod, babel({
                presets: ['@babel/env']
            })))
            .pipe(gulpif(gulpConfig.minifying.js, uglify()))
            .pipe(gulpif(gulpConfig.sourcemaps.js, sourcemaps.write('', {
                sourceMappingURLPrefix: ''
            })))
            .pipe(gulp.dest(path.dest.js))
            .pipe(gulpif(gulpConfig.reload, browserSync.stream()));
    } else {
        console.error('Select build mode: --dev or --prod');
    }
});


gulp.task('js:independent', function () {
    if ((gulpConfig.params.dev && !gulpConfig.params.prod) || (!gulpConfig.params.dev && gulpConfig.params.prod)) {   
        return gulp.src([path.src.js.all, path.src.js.ignore])
            .pipe(gulpif(gulpConfig.params.prod, babel({
                presets: ['@babel/env']
            })))
            .pipe(gulpif(gulpConfig.minifying.js, uglify()))
            .pipe(gulp.dest(path.dest.js))
            .pipe(gulpif(gulpConfig.reload, browserSync.stream()));
    } else {
        console.error('Select build mode: --dev or --prod');
    }
});


gulp.task('js', function (cb) {
    if (gulpConfig.params.dev || gulpConfig.params.prod) {   
        gulpSequence(['js:combined', 'js:independent'], cb);
    } else {
        console.error('Select build mode: --dev or --prod');
    }
});


gulp.task('img', function () {
    if (!gulpConfig.params.dev && gulpConfig.params.prod) {   
        return gulp.src(path.src.img.all)
            .pipe(imagemin([
                imagemin.gifsicle({
                    interlaced: true
                }),
                imagemin.jpegtran({
                    progressive: true
                }),
                imagemin.optipng({
                    optimizationLevel: 5
                }),
                imagemin.svgo({
                    plugins: [{
                            removeViewBox: true
                        },
                        {
                            cleanupIDs: false
                        }
                    ]
                })
            ]))
            .pipe(gulp.dest(path.dest.img))
    } else {
        console.error('Select build mode: --prod');
    }
});


gulp.task('assets', function () {
    if (gulpConfig.params.dev && !gulpConfig.params.prod) {   
        return gulp.src(path.src.assets.all, {
                nodir: true
            })
            .pipe(gulpif(gulpConfig.params.dev || gulpConfig.params.prod, gulpIgnore.exclude([path.exclude.sass, path.exclude.js.all])))
            .pipe(gulpif(gulpConfig.params.prod, gulpIgnore.exclude([path.exclude.gif, path.exclude.svg, path.exclude.png, path.exclude.jpg, path.exclude.jpeg])))
            .pipe(gulp.dest(path.dest.assets.root))
            .pipe(gulpif(gulpConfig.reload, browserSync.stream()));
    } else {
        console.error('Select build mode: --dev or --prod');
    }
});