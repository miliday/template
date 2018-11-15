const   gulp			= require('gulp'),
	    browserSync		= require('browser-sync'),
	    autoprefixer	= require('gulp-autoprefixer'),
	    csso			= require('gulp-csso'),
	    rename			= require('gulp-rename'),
	    imgmin			= require('gulp-imagemin'),
	    pngquant		= require('imagemin-pngquant'),
	    sass			= require('gulp-sass'),
	    sourcemaps		= require('gulp-sourcemaps'),
	    uglify			= require('gulp-uglify'),
        babel			= require('gulp-babel'),
	    htmlmin			= require('gulp-htmlmin'),
        mediaGroup		= require('gulp-group-css-media-queries'),
        concat          = require('gulp-concat'),
        clean           = require('gulp-clean'),
	    reload			= browserSync.reload;

var serverConfig = {
    server: {
        baseDir: "dist"
    },
    ui: {
    	port: 	8088
    },
    notify: 	false,
    port: 		8080,
    ghostMode: 	false,
    logPrefix: 	"miliday",
    host:       "localhost",
    tunnel: 	"miliday-tunnel",
    open: 		"local"
};

var path = {
	dist:{
		html: 	'dist/',
        css: 	'dist/assets/css/',
        js: 	'dist/assets/js/',
        img: 	'dist/assets/img/',
        fonts: 	'dist/assets/font/',
        video: 	'dist/assets/video/',
        lib:    'dist/assets/lib/'
	},
	src:{
		html: 	'src/*.html',
		css: 	'src/assets/css/main.css',
		scss: 	'src/assets/scss/main.scss',
		js: 	'src/assets/js/main.js',
		img: 	'src/assets/img/**/*.*',
		fonts: 	'src/assets/font/**/*.*',
		video: 	'src/assets/video/**/*.*',
        lib:    [
                'src/assets/lib/**/*.css',
                'src/assets/lib/**/*.js'
            ]
	},
	watch:{
		html: 	'src/*.html',
		scss: 	'src/assets/scss/**/*.scss',
		js: 	'src/assets/js/**/*.js'
    }
}





// **********  Clean dist repository  **********

gulp.task('rm-dist', function () {
    return gulp.src('dist')
        .pipe(clean())
});





// **********  Tasks for build project  **********

gulp.task('build-html', function() {
    gulp.src(path.src.html) 
        // .pipe(htmlmin({collapseWhitespace: true}))	// Minification html  // Uncomment if you need compressed HTML
        .pipe(gulp.dest(path.dist.html))
});

gulp.task('build-js', function() {
    gulp.src(path.src.js) 							// Initialize sourcemap
        .pipe(babel({                               // Change to prev version
            presets: ['env']
        })) 
        .pipe(uglify()) 		
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('build-css', function() {
    gulp.src(path.src.css) 
        .pipe(mediaGroup())							// Collect media queris together
        .pipe(autoprefixer()) 						// Add lib prefixes
        .pipe(csso()) 								// Compretion css
        .pipe(gulp.dest(path.dist.css))
});

gulp.task('build-img', function() {
    gulp.src(path.src.img) 
        .pipe(imgmin({ 								// Compretion image
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img))
});

gulp.task('build-fonts', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('build-lib', function(){
	gulp.src(path.src.lib)
	.pipe(gulp.dest(path.dist.lib))
})




// **********  Tasks for build all project  **********

gulp.task('build', ['build-html', 'build-js', 'build-css', 'build-img', 'build-fonts', 'build-lib']);




// ********** Localhost task **********

gulp.task('webserver', function() {
    browserSync(serverConfig);
});




// ********** Clean js for watcher **********

gulp.task('clean-js', function() {
    return gulp.src(['src/assets/js/main.js', 'src/assets/js/main.js.map'])
    .pipe(clean())
})



// **********  Watch task + reload  **********

gulp.task('js-r', ['clean-js'], function(){
    return gulp.src(path.watch.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('', {
        sourceMappingURLPrefix: ''
    }))
    .pipe(gulp.dest('./src/assets/js/'))
    .pipe(browserSync.reload({stream: true}));
})

gulp.task('sass-r', function(){
    return gulp.src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))	// Сompile scss to css
    .pipe(sourcemaps.write('', {
        sourceMappingURLPrefix: ''
    }))
    .pipe(gulp.dest('./src/assets/css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch-r', ['webserver', 'sass-r', 'js-r'], function() {
    gulp.watch(path.watch.scss, ['sass-r']);
	gulp.watch(path.watch.html, reload);
	gulp.watch(path.watch.js, ['js-r']);
});




// **********  Watch task  **********

gulp.task('js', ['clean-js'], function(){
    return gulp.src(path.watch.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('', {
        sourceMappingURLPrefix: ''
    }))
    .pipe(gulp.dest('./src/assets/js/'))
})

gulp.task('sass', function(){
    return gulp.src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))	// Сompile scss to css
    .pipe(sourcemaps.write('', {
        sourceMappingURLPrefix: ''
    }))
    .pipe(gulp.dest('./src/assets/css/'))
});

gulp.task('watch', ['webserver', 'sass', 'js'], function() {
    gulp.watch(path.watch.scss, ['sass']);
    gulp.watch(path.watch.js, ['js']);
});
