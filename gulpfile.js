const gulp = require('gulp');
const sass = require('gulp-sass');
const image = require('gulp-image');
sass.compiler = require('node-sass');

const path = {
    src: {
        pug: './src/assets/views/**/*.pug',
        sass: './src/assets/scss/**/*.scss',
        img: './src/assets/img/**/*'
    },
    dest: {
        html: './dist/',
        css: './dist/assets/css/',
        img: './dist/assets/img/'
    },
    watch: {
        pug: './src/assets/views/**/*.pug',
        sass: './src/assets/scss/**/*.scss',
    }
}

const imageConfig = {
    pngquant: true,
    optipng: false,
    zopflipng: true,
    jpegRecompress: false,
    mozjpeg: true,
    guetzli: false,
    gifsicle: true,
    svgo: true,
    concurrent: 10,
    quiet: true
}

gulp.task('default', function () {
    gulp.watch(path.watch.pug, ['pug']);
    gulp.watch(path.watch.sass, ['sass']);
});

gulp.task('image', function () {
    return gulp.src(path.src.img)
        .pipe(image(imageConfig))
        .pipe(gulp.dest(path.dest.img));
});

gulp.task('sass', function () {
    return gulp.src(path.src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.dest.css));
});