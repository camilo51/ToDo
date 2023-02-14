const { src, watch, dest } = require('gulp');
const plumber = require('gulp-plumber')

// css
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

// js
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');


function css(done) {
    
    src('src/css/**/*.css')
    .pipe(plumber())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('build/css'))
    done()
}

function js(done) {
    
    src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('build/js'))
    done()
}

function dev(done) {
    watch('src/css/**/*.css', css)
    watch('src/js/**/*.js', js)

    done()
}

exports.dev = dev;