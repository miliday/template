/*
    **************************************************

    Gulpfile creator

    **************************************************

    nickname: Dmitriy_Corty
    organization: "Totonis.com"
    date: 25.06.2018
    email: dmitriy.corty@gmail.com

    **************************************************
*/

var gulp			= require('gulp'),
	browserSync		= require('browser-sync'),
	autoprefixer	= require('gulp-autoprefixer'),
	csso			= require('gulp-csso'),
	rename			= require('gulp-rename'),
	imgmin			= require('gulp-imagemin'),
	pngquant		= require('imagemin-pngquant'),
	rigger			= require('gulp-rigger'),
	sass			= require('gulp-sass'),
	sourcemaps		= require('gulp-sourcemaps'),
	uglify			= require('gulp-uglify'),	
	babel			= require('gulp-babel'),
	htmlmin			= require('gulp-htmlmin'),
	mediaGroup		= require('gulp-group-css-media-queries'),
	reload			= browserSync.reload;

var serverConfig = {
    server: {
        baseDir: "src" 								// The root folder for the server
    },
    ui: {
    	port: 	3001 								// Your port, for server settings
    },
    notify: 	false, 								// Сancel page update notifications
    port: 		3000, 								// Your port on the server
    ghostMode: 	false,								// Disable guest tracking
    logPrefix: 	"Name Project",
    host:       "localhost",
    tunnel: 	"totonis-server",  					// Your developer name
    open: 		"local"   						// Opens a server(local, tunnel, external)
};

var path = {
	dist:{
		html: 	'dist/',
        css: 	'dist/assets/css/',
        js: 	'dist/assets/js/',
        img: 	'dist/assets/img/',
        fonts: 	'dist/assets/font/',
        lib: 'dist/assets/lib/'
	},
	src:{
		html: 	'src/*.html',
		css: 	'src/assets/css/main.css',
		scss: 	'src/assets/scss/main.scss',
		js: 	'src/assets/js/*.js',
		img: 	'src/assets/img/**/*.*',
		fonts: 	'src/assets/font/**/*.*',
		lib: [
            'src/assets/lib/**/*.css',
            'src/assets/lib/**/*.js'
         ]
	},
	watch:{
		html: 	'src/*.html',
		scss: 	'src/assets/scss/main.scss',
		js: 	'src/assets/js/*.js'
	}
}





// **********  Tasks for gulp  **********





// **********  Tasks fir build project  **********

gulp.task('build-html', function() {
    gulp.src(path.src.html) 
        .pipe(rigger()) 							// Include files html. Example: //= template/_footer.html
        // .pipe(htmlmin({collapseWhitespace: true}))	// Minification html  // Uncomment if you need compressed HTML
        .pipe(gulp.dest(path.dist.html))
});

gulp.task('build-js', function() {
    gulp.src(path.src.js) 							// Initialize sourcemap
        .pipe(rigger())                             // Include files js. Example: //= ../../function.js
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


// **********  Watch task + reload  **********

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

gulp.task('watch-r', ['webserver', 'sass-r'], function() {
    gulp.watch(path.watch.scss, ['sass-r']);
	gulp.watch(path.watch.html, reload);
	gulp.watch(path.watch.js, reload);
});

// **********  Watch task  **********

gulp.task('sass', function(){
    return gulp.src(path.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))	// Сompile scss to css
    .pipe(sourcemaps.write('', {
        sourceMappingURLPrefix: ''
    }))
    .pipe(gulp.dest('./src/assets/css/'))
});

gulp.task('watch', ['webserver', 'sass'], function() {
    gulp.watch(path.watch.scss, ['sass']);
});
