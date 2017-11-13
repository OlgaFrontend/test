var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'), 
    autoprefixer = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglifyjs'); 
    // rename = require('gulp-rename'),
    // cssnano = require('gulp-cssnano');

gulp.task('scss', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions','> 1%', 'ie 8', 'ie 7'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify()) 
        .pipe(gulp.dest('dist/js')) 
});

gulp.task('browserSync', function() { 
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('pages', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function() {
    gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
    gulp.src('src/fonts/**')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('default', function() {
    gulp.start('pages', 'fonts', 'scss', 'browserSync', 'css', 'img',  'scripts');
    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/fonts/**', ['fonts']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});