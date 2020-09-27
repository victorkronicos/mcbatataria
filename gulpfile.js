/*---- IMPORTANDO RECURSOS -----*/
const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    image = require('gulp-image'),
    sass = require('gulp-sass');

sass.compiler = require('node-sass');

/*----- CAMINHOS ---------------*/
const paths = {
    dev: {
        img: "src/assets/images/**/*",
        js: "src/assets/js/*.js",
        sass: "src/assets/sass/**/*.scss",
    },
    dist: {
        img: "public/images",
        js: "public/js",
        css: "public/css",
    }
}

/*------ RECURSOS --------*/
const assets = {
    css: [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
    ],
    js: [
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
    ],
}

/*------ FUNÇÕES ---------*/

// Compilar SASS
function compSass() {
    return gulp
        .src(paths.dev.sass)
        .pipe(sass({ outputStyle: 'compressed' }).on("error", sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest(paths.dist.css));
}

// Importar CSS dos assets
function vendorCss() {
    return gulp
        .src(assets.css)
        .pipe(gulp.dest(`${paths.dist.css}/vendor`));
}

// Concatenar e minificar JS dos assets
function vendorJs() {
    return gulp
        .src(assets.js)
        .pipe(concat('vendor.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
        }))
        .pipe(gulp.dest(paths.dist.js))
}

// Concatenar e minificar JS
function minJs() {
    return gulp
        .src(paths.dev.js)
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
              min: '.min.js'
            },
        }))
        .pipe(gulp.dest(paths.dist.js))
}

// Minificar imagens
function minImg() {
    return gulp
        .src(paths.dev.img)
        .pipe(image())
        .pipe(gulp.dest(paths.dist.img))
}

// Assistir arquivos
function watch() {
    gulp.watch(paths.dev.sass, compSass);
    gulp.watch(paths.dev.img, minImg);
    gulp.watch(paths.dev.js, minJs);
}

/*-------------
---- TASKS ----
-------------*/
gulp.task("default", watch);
gulp.task("assets", vendorCss);
gulp.task("image", minImg);
gulp.task("js", gulp.series(vendorJs, minJs));
gulp.task("sass", compSass);